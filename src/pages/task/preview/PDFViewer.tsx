import * as PDFJS from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePreviewState } from "./state";
import { Skeleton } from "@douyinfe/semi-ui";
import { PDFViewerSkeleton } from "./PDFViewerSkeleton";

PDFJS.GlobalWorkerOptions.workerSrc = workerUrl;
// 用于判断元素在特定可滚动区域内的可见性
function isElementInScrollableContainer(
  el: HTMLDivElement,
  container: HTMLDivElement
) {
  const rect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return (
    rect.top >= containerRect.top &&
    rect.left >= containerRect.left &&
    rect.bottom <= containerRect.bottom &&
    rect.right <= containerRect.right
  );
}
function useRenderPDF(url: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setTotalPage } = usePreviewState();
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    setLoading(true);

    const loadingTask = PDFJS.getDocument(url);

    loadingTask.promise
      .then(async (pdf) => {
        const container = containerRef.current;
        setNumPages(pdf.numPages);
        setTotalPage(pdf.numPages);
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const pageContainer = document.createElement("div");
          pageContainer.style.position = "relative";
          // data-page
          pageContainer.setAttribute("data-page", `${pageNumber}`);
          container?.appendChild(pageContainer);

          // 图片层
          const canvas = document.createElement("canvas");
          canvas.style.width = "100%";
          pageContainer.appendChild(canvas);

          // 文本层
          const textLayerDiv = document.createElement("div");
          pageContainer.appendChild(textLayerDiv);
          textLayerDiv.style.position = "absolute";
          textLayerDiv.style.zIndex = "10";

          // 获得屏幕像素比
          const pixelRatio = window.devicePixelRatio || 1;
          const viewport = page.getViewport({ scale: 2 * pixelRatio });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: canvas.getContext("2d")!,
            viewport: viewport,
          };

          await page.render(renderContext);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      // 清空cntainer

      loadingTask?.destroy();
    };
  }, [url]);
  return { containerRef, loading, numPages };
}

const url =
  "https://static.openxlab.org.cn/opendatalab/assets/pdf/demo1/%E7%A4%BA%E4%BE%8B1.pdf";

export function PDFViewer() {
  const { loading, containerRef } = useRenderPDF(url);
  const { previewIndex, totalPages, setPreviewIndex } = usePreviewState();
  const scrollToPage = useCallback((pageIndex: number) => {
    const pageElement = containerRef.current?.querySelector(
      `[data-page="${pageIndex}"]`
    );
    pageElement?.scrollIntoView({});
  }, []);
  useEffect(() => {
    scrollToPage(previewIndex);
  }, [previewIndex]);
  const onScroll = useCallback<
    NonNullable<React.DOMAttributes<HTMLDivElement>["onScroll"]>
  >((e) => {
    const elements = containerRef.current?.querySelectorAll("[data-page]");
    if (!elements) {
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLDivElement;
      if (isElementInScrollableContainer(element, e.target as HTMLDivElement)) {
        setPreviewIndex(parseInt(element.getAttribute("data-page")!));
        break;
      }
    }
  }, []);
  return (
    <div className="h-full flex  flex-col relative">
      <div
        className="absolute bg-white p-5 inset-0 z-10 data-[loading=true]:block hidden"
        data-loading={loading}
      >
        <PDFViewerSkeleton />
      </div>
      <div className="flex items-center justify-center">
        {/* 工具栏 */}
        {previewIndex}/{totalPages}
        <button onClick={() => setPreviewIndex(previewIndex + 1)}>
          下一页
        </button>
      </div>
      <div
        onScroll={onScroll}
        className="h-1 flex-1 relative overflow-y-auto w-full"
        ref={containerRef}
      ></div>
    </div>
  );
}
