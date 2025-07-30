import { useEffect, useState } from "react";

export const useMapHeight = () => {
  const [mapHeight, setMapHeight] = useState("calc(100vh - 112px)");

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window === "undefined") return;

    const resize = () => {
      const head = document.getElementById("appHead");
      const foot = document.getElementById("appFooter");
      const height = window.innerHeight - (head?.offsetHeight ?? 56) - (foot?.offsetHeight ?? 56);
      setMapHeight(`${height}px`);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return mapHeight;
};
