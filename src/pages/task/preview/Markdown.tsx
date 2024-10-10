 
import { MarkdownRender } from "@douyinfe/semi-ui";
import { useScrollPage } from "../../../hooks/useScrollPage";
import { useEffect } from "react";
import { usePreviewState } from "./state";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const TRIGGER_CONTAINER_ID = "MARKDOWN_VIEWER";



export function Markdown(props: { 
  markdowns:Array<{
    content?:string , 
    page_idx:number
  }>
}) {
  const {markdowns} = props;

  const { currentPage, containerRef, scrollToPage } = useScrollPage();
  const { triggerContainerId, previewIndex, setPreviewIndex } =
    usePreviewState();


  useEffect(() => {
    if (currentPage !== previewIndex) {
      setPreviewIndex(currentPage, TRIGGER_CONTAINER_ID);
    }
  }, [currentPage]);
  useEffect(() => {
    if (triggerContainerId !== TRIGGER_CONTAINER_ID) {
      scrollToPage(previewIndex);
    }
  }, [previewIndex, triggerContainerId]);

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto">
      {markdowns?.map((content) => (
        <div data-page={content.page_idx} key={content.page_idx}>
          <MarkdownRender 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          raw={content.content} />
        </div>
      ))}
    </div>
  );
}
