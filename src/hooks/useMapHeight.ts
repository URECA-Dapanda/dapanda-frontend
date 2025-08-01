import { useEffect, useState } from "react";

export const useMapHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(56); // SSR 기본값
  const [footerHeight, setFooterHeight] = useState(56); // SSR 기본값
  const [mapHeight, setMapHeight] = useState("calc(100vh - 112px)"); // SSR 기본값

  useEffect(() => {
    // 클라이언트 환경에서만 실행
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const updateHeights = () => {
        const header = document.getElementById("appHead");
        const footer = document.getElementById("appFooter");

        const headerH = header?.offsetHeight ?? 56;
        const footerH = footer?.offsetHeight ?? 56;
        const total = window.innerHeight - headerH - footerH;

        setHeaderHeight(headerH);
        setFooterHeight(footerH);
        setMapHeight(`${total}px`);
      };

      updateHeights();
      window.addEventListener("resize", updateHeights);
      return () => window.removeEventListener("resize", updateHeights);
    }
  }, []);

  return { mapHeight, headerHeight, footerHeight };
};
