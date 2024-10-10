 
import { MarkdownRender } from "@douyinfe/semi-ui";
import { useScrollPage } from "../../../hooks/useScrollPage";
import { useEffect } from "react";
import { usePreviewState } from "./state";
import { useRequest } from "ahooks";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getApiUrl } from "@/lib/config";
const TRIGGER_CONTAINER_ID = "MARKDOWN_VIEWER";

function addPrefixToImages(markdown: string, prefix: string): string {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  return markdown.replace(imageRegex, (_match, imageUrl) => {
      const newImageUrl = `${prefix}${imageUrl}`;
      return `![](${newImageUrl})`;
  });
}

async function loadMarkdown(url: string,imagePath:string) {
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
    return addPrefixToImages(markdownContent,imagePath);
  } catch (error) {
    console.error("Error fetching markdown:", error);
  }
}

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
