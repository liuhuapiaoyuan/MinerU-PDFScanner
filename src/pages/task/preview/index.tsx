import { useLoaderData } from "react-router-dom";
import { Markdown } from "./Markdown";
import { PDFViewer } from "./PDFViewer";
import { PreviewStateContainer } from "./state";
import { Task } from "@/service/task.model";
import { getApiUrl } from "@/lib/config";


// 加载数据，显示PDF， markdown的情况
export function Component() {
  const task = useLoaderData() as Task;

  return (
    <PreviewStateContainer>
      <div className="h-full flex ">
        <div className="flex-1 w-1">
          <PDFViewer 
            pdf={getApiUrl(task.pdf_url)}
          />
        </div>
        <div className="flex-1 w-1">
          <Markdown />
        </div>
      </div>
    </PreviewStateContainer>
  );
}
