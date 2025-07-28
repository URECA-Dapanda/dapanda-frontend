import { useEffect } from "react";
import { useMapStore } from "@/feature/map/stores/useMapStore";

export function useMyLocation(map?: naver.maps.Map | null) {
  const setMyPosition = useMapStore((state) => state.setMyPosition);
  const isManualPan = useMapStore((state) => state.isManualPan);

  useEffect(() => {
    if (!window.navigator || !navigator.geolocation || isManualPan) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latlng = new window.naver.maps.LatLng(coords.latitude, coords.longitude);

        // 상태 저장
        setMyPosition(latlng);

        // 지도가 있다면 중심 이동 + 마커 표시
        if (map) {
          map.setCenter(latlng);

          new window.naver.maps.Marker({
            position: latlng,
            map,
            icon: {
              content:
                '<div style="background:#e6007e;width:12px;height:12px;border-radius:9999px;"></div>',
            },
          });
        }
      },
      () => {
        console.warn("위치 정보를 가져올 수 없습니다.");
      },
      { enableHighAccuracy: true }
    );
  }, [map, isManualPan]);
}
