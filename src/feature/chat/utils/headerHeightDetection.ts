import { useEffect, useState, RefObject } from "react";

export const useHeaderHeightDetection = (
  headerRef: RefObject<HTMLDivElement>,
  dependency?: unknown
) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const measureHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    measureHeaderHeight();

    window.addEventListener("resize", measureHeaderHeight);

    return () => {
      window.removeEventListener("resize", measureHeaderHeight);
    };
  }, [headerRef, dependency]);

  return headerHeight;
};
