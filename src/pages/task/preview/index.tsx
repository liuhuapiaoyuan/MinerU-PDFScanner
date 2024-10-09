import { Markdown } from "./Markdown";
import { PDFViewer } from "./PDFViewer";
import { PreviewStateContainer } from "./state";

export function Component() {
  return (
    <PreviewStateContainer>
      <div className="h-full flex ">
        <div className="flex-1 w-1">
          <PDFViewer />
        </div>
        <div className="flex-1 w-1">
          <Markdown />
        </div>
      </div>
    </PreviewStateContainer>
  );
}
