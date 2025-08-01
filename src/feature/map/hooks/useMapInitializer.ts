import { useEffect } from "react";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import type { MapType } from "@/feature/map/types/mapType";
import { MAP_CONTAINER_ID, DEFAULT_LOCATION } from "@/feature/map/constants/map";
import { getMapList } from "@/feature/map/api/mapRequest";
import { toast } from "react-toastify";

interface UseMapInitializerOptions {
  onStoreListUpdate?: (list: MapType[]) => void;
  onMapInit?: (map: naver.maps.Map) => void;
  initialSort?: "DISTANCE_ASC" | "PRICE_ASC" | "AVERAGE_RATE_DESC";
}

export const useMapInitializer = (options?: UseMapInitializerOptions) => {
  const { setMap, setStoreList, setMyPosition } = useMapStore();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 50;

    const interval = setInterval(() => {
      const naver = window.naver;

      if (!naver?.maps) {
        retryCount += 1;
        if (retryCount > maxRetries) {
          clearInterval(interval);
          console.warn("🛑 Naver Map 로드 실패: window.naver.maps 없음");
        }
        return;
      }

      const mapContainer = document.getElementById(MAP_CONTAINER_ID);
      if (!mapContainer) {
        clearInterval(interval);
        console.warn("🛑 지도 컨테이너가 존재하지 않음");
        return;
      }

      clearInterval(interval); // ✅ 준비 완료, 더 이상 재시도 필요 없음

      const center = new naver.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
      const map = new naver.maps.Map(mapContainer, {
        center,
        zoom: 15,
      });

      setMap(map);
      options?.onMapInit?.(map);

      navigator.geolocation?.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          const current = new naver.maps.LatLng(latitude, longitude);
          map.setCenter(current);
          setMyPosition(current);

          try {
            const res = await getMapList({
              size: 10,
              latitude,
              longitude,
              productSortOption: options?.initialSort ?? "DISTANCE_ASC",
              open: true,
            });

            setStoreList(res.items);
            options?.onStoreListUpdate?.(res.items);
          } catch (e) {
            toast.error("와이파이 목록을 불러오는 데 실패했습니다.");
            console.error(e);
          }
        },
        () => toast.error("위치 정보를 가져올 수 없습니다."),
        { enableHighAccuracy: true }
      );
    }, 100);

    return () => clearInterval(interval);
  }, [options, setMap, setMyPosition, setStoreList]);
};
