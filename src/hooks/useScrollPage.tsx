import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

export function useScrollPage(externalRef?: React.RefObject<HTMLDivElement|null>) {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(externalRef?.current!);


  useEffect(() => {
    const options = {
      root: containerRef.current, // 使用容器作为根
      rootMargin: "0px",
      threshold: 0.5, // 50% 可见时触发
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPage(Number(entry.target.getAttribute("data-page")));
        }
      });
    }, options);

    const elements = containerRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        Array.from(elements).forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const scrollToPage = useCallback((pageIndex: number) => {
    const pageElement = containerRef.current?.querySelector(
      `[data-page="${pageIndex}"]`
    );
    pageElement?.scrollIntoView({});
  }, []);

  // const scrollToPage = (pageIndex: number) => {
  //   const elements = containerRef.current?.querySelectorAll("[data-page]")
  //   if (elements && elements[pageIndex]) {
  //     (elements[pageIndex] as HTMLElement).scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

  return { currentPage, containerRef , scrollToPage };
}
