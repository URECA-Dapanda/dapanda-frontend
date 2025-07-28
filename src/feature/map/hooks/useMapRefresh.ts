import { useEffect } from "react";

export function useMapRefresh(map: naver.maps.Map | null) {
  useEffect(() => {
    if (!map || !window.naver) return;

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        window.naver.maps.Event.trigger(map, "resize");
        map.setCenter(map.getCenter()); // 화면 재렌더 유도
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [map]);
}
