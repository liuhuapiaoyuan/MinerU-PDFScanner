import { useLoaderData } from "react-router-dom";
import { Markdown } from "./Markdown";
import { PDFViewer } from "./PDFViewer";
import { PreviewStateContainer } from "./state";
import { getApiUrl } from "@/lib/config";
import { PDFViewerSkeleton } from "./PDFViewerSkeleton";
import { LoadTaskResult } from "@/service/task.service";

// 加载数据，显示PDF， markdown的情况
export function Component() {
  const { task, markdowns } = useLoaderData() as LoadTaskResult;

  return (
    <PreviewStateContainer>
      <div className="flex h-full flex-col">
        <div className="p-2 text-center">{task.file_name}</div>
        <div className="h-1 flex-1 flex ">
          <div className="flex-1 w-1">
            <PDFViewer pdf={getApiUrl(task.pdf_url)} />
          </div>
          <div className="flex-1 w-1">
            {task.status == "done" && <Markdown markdowns={markdowns} />}
            {(task.status == "pending" || task.status == "processing") && (
              <PDFViewerSkeleton />
            )}
          </div>
        </div>
      </div>
    </PreviewStateContainer>
  );
}
