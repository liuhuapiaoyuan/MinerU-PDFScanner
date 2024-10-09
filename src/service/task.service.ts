import AsyncQueryQueue from "@/lib/QueryQueue";
import { Task } from "./task.model";
import { taskRepository, TaskRepository } from "./task.repository";
import { getApiUrl } from "@/lib/config";
import { Notification } from "@douyinfe/semi-ui";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
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
                    content: `文件：${task.file_name}处理失败`,
                })
            }

            // status
            return taskRepository.update({
                ...task,
                status: fail ? "fail" : status
            })
        })
    }

}


export const taskService = new TaskService(taskRepository);