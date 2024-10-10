import AsyncQueryQueue from "@/lib/QueryQueue";
import { Task } from "./task.model";
import { taskRepository, TaskRepository } from "./task.repository";
import { getApiUrl } from "@/lib/config";
import { Notification } from "@douyinfe/semi-ui";
import { clearCache } from "ahooks";

function addPrefixToImages(markdown: string, prefix: string): string {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  return markdown.replace(imageRegex, (_match, imageUrl) => {
    const newImageUrl = `${prefix}${imageUrl}`;
    return `![](${newImageUrl})`;
  });
}

export async function loadMarkdown(url: string, imagePath: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取 Content-Type 头部中的编码信息
    let contentType = response.headers.get("Content-Type") || "";
    let encoding = "utf-8"; // 默认使用 UTF-8 编码
    const match = contentType.match(/charset=([^;]+)/);
    if (match) {
      encoding = match[1];
    }

    // 根据 Content-Type 中的编码读取响应体
    const body = await response.arrayBuffer();
    const decoder = new TextDecoder(encoding);
    const markdownContent = decoder.decode(body);
    return addPrefixToImages(markdownContent, imagePath);
  } catch (error) {
    console.error("Error fetching markdown:", error);
  }
}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 定义内容列表项的类型
interface ContentListItem {
  page_idx: number;
}

// 定义 Markdown 内容项的类型
export interface MarkdownItem {
  page_idx: number;
  content?: string;
}

// 定义 loadTask 函数返回结果的类型
export interface LoadTaskResult {
  /**
   * 任务对象
   */
  task: Task;
  /**
   * 分页内容列表
   */
  contentList: ContentListItem[];
  /**
   * 分页数量
   */
  pageNumber: number;
  /**
   * 分页内容
   */
  markdowns: MarkdownItem[];
}
/**
 * 任务初始化会加载所有任务到内存中，并启动定时任务
 */
export class TaskService {
  /**
   * pending，以及processing任务列表
   */
  todoTasks: Task[] = [];
  taskRepository: TaskRepository;
  queue: AsyncQueryQueue = new AsyncQueryQueue()

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }
  public async loadTasks(): Promise<void> {
    const tasks = await this.taskRepository.list(`status in ('pending','processing')`);
    for (const task of tasks) {
      this.addTask(task)
    }
  }
  /**
   * 启动监听任务
   * @param task 
   */
  public async addTask(task: Task): Promise<void> {
    this.todoTasks.push(task);
    this.queue.enqueue(() => Promise.all([
      this.queueTask(task),
      delay(5 * 1000)
    ]))
  }

  private queueTask(task: Task): Promise<void> {
    return fetch(getApiUrl(`/task/${task.task_id}`), {}).then(resp => {
      return resp.json()
    }).then(({ status }) => {
      if (status === 'pedding' || status === 'processing') {
        this.addTask(task)
      }

      let fail = status.includes('处理失败')
      if (status === 'done') {
        Notification.success({
          title: '任务处理成功',
          content: `文件：${task.file_name}处理成功`,
        })
      }
      if (fail) {
        Notification.error({
          title: '任务处理失败',
          content: `文件：${task.file_name},${status}`,
        })
      }
      const newStatus = fail ? "fail" : status;
      if (task.status !== newStatus) {
        clearCache("tasks_" + task.status)
      }

      // status
      return taskRepository.update({
        ...task,
        status: newStatus
      })
    })
  }

  /**
   * 1. 加载task对象
   * 2. 加载分页数据
   * 3. 加载markdown分页内容
   * @param task_id 
   */
  async loadTask(task_id: string): Promise<LoadTaskResult> {
    const task = await this.taskRepository.findById(task_id)
    if (!task) {
      throw new Error("任务不存在")
    }
    const contentList = await fetch(getApiUrl(task.content_list_json)).then((r) => r.json()).then(r => r as Array<{ page_idx: number }>)
    const pages = contentList?.[contentList.length - 1]?.page_idx ?? 0;
    const markdownLinks = new Array(pages)
      .fill(1)
      .map((_, index) => getApiUrl(`/file/output/${task.task_id}/${index}.md`));
    const markdowns = await Promise.all(markdownLinks.map(link => loadMarkdown(link, task.images)))
    return {
      task,
      contentList,
      pageNumber: pages,
      markdowns: markdowns.map((content, index) => ({
        page_idx: index + 1,
        content
      }))
    }
  }

}


export const taskService = new TaskService(taskRepository);