 
import { MarkdownRender } from "@douyinfe/semi-ui";
import { useScrollPage } from "../../../hooks/useScrollPage";
import { useEffect } from "react";
import { usePreviewState } from "./state";
import { useRequest } from "ahooks";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const TRIGGER_CONTAINER_ID = "MARKDOWN_VIEWER";

async function loadMarkdown(url: string) {
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
    console.log("markdownContent:", markdownContent);
    return markdownContent;
  } catch (error) {
    console.error("Error fetching markdown:", error);
  }
}

export function Markdown(props: {
  imagePath: string;
  markdownLinks: string[];
}) {
  const { imagePath, markdownLinks } = props;

  const { currentPage, containerRef, scrollToPage } = useScrollPage();
  const { triggerContainerId, previewIndex, setPreviewIndex } =
    usePreviewState();

  const markdowns = useRequest(
    () => Promise.all(markdownLinks.map(loadMarkdown)),
    {
      refreshDeps: [markdownLinks],
      manual: false,
    }
  );

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
      {markdowns.data?.map((content, index) => (
        <div data-page={index + 1} key={index}>
          <MarkdownRender 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          raw={content} />
        </div>
      ))}
    </div>
  );
}
