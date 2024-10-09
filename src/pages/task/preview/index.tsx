import { useLoaderData } from "react-router-dom";
import { Markdown } from "./Markdown";
import { PDFViewer } from "./PDFViewer";
import { PreviewStateContainer } from "./state";
import { Task } from "@/service/task.model";
import { getApiUrl } from "@/lib/config";
import { PDFViewerSkeleton } from "./PDFViewerSkeleton";
import { useRequest } from "ahooks";

// 加载数据，显示PDF， markdown的情况
export function Component() {
  const task = useLoaderData() as Task;
  const contentList = useRequest<Array<{ page_idx: number }>, []>(() =>
    fetch(getApiUrl(task.content_list_json)).then((r) => r.json())
  );
  const pages = contentList.data?.[contentList.data.length - 1]?.page_idx ?? 0;
  const markdownLinks = new Array(pages)
    .fill(1)
    .map((_, index) => getApiUrl(`/file/output/${task.task_id}/${index}.md`));

  return (
    <PreviewStateContainer>
      <div className="flex h-full flex-col">
        <div className="p-2 text-center">{task.file_name}</div>
        <div className="h-1 flex-1 flex ">
          <div className="flex-1 w-1">
            <PDFViewer pdf={getApiUrl(task.pdf_url)} />
          </div>
          <div className="flex-1 w-1">
            {!contentList.loading && task.status == "done" && (
              <Markdown imagePath={task.images} markdownLinks={markdownLinks} />
            )}
            {(contentList.loading ||
              task.status == "pending" ||
              task.status == "processing") && <PDFViewerSkeleton />}
          </div>
        </div>
      </div>
    </PreviewStateContainer>
  );
}
