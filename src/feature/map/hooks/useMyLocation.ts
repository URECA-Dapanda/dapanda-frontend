import { useEffect } from "react";
import { useMapStore } from "@/feature/map/stores/useMapStore";

export function useMyLocation(map?: naver.maps.Map | null) {
  const setMyPosition = useMapStore((state) => state.setMyPosition);
  const isManualPan = useMapStore((state) => state.isManualPan);

  useEffect(() => {
    if (!map || typeof window === "undefined") return;
    if (isManualPan) return;

    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latlng = new window.naver.maps.LatLng(coords.latitude, coords.longitude);
        setMyPosition(latlng);

        map.setCenter(latlng);
        new window.naver.maps.Marker({
          position: latlng,
          map,
          icon: {
            content:
              '<div style="background:#e6007e;width:12px;height:12px;border-radius:9999px;"></div>',
          },
          zIndex: 999,
        }).addListener("click", () => {
          window.naver.maps.Event.trigger(map, "click", { coord: latlng });
        });
      },
      () => {
        // 실패 시 fallback 위치 사용
        const fallbackLatLng = new window.naver.maps.LatLng(37.5665, 126.978);
        setMyPosition(fallbackLatLng);

        map.setCenter(fallbackLatLng);
        new window.naver.maps.Marker({
          position: fallbackLatLng,
          map,
          icon: {
            content:
              '<div style="background:#e6007e;width:12px;height:12px;border-radius:9999px;"></div>',
          },
          zIndex: 999,
        }).addListener("click", () => {
          window.naver.maps.Event.trigger(map, "click", { coord: fallbackLatLng });
        });
      },
      { enableHighAccuracy: true }
    );
  }, [map, isManualPan]);
}
