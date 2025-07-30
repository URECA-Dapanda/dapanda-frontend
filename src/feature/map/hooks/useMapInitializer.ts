import { useEffect } from "react";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import type { MapType } from "@/feature/map/types/mapType";
import { MAP_CONTAINER_ID, DEFAULT_LOCATION } from "@/feature/map/constants/map";
import { getMapList } from "@/feature/map/api/mapRequest";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

interface UseMapInitializerOptions {
  onStoreListUpdate?: (list: MapType[]) => void;
  onMapInit?: (map: naver.maps.Map) => void;
  initialSort?: "DISTANCE_ASC" | "PRICE_ASC" | "AVERAGE_RATE_DESC";
}

export const useMapInitializer = (options?: UseMapInitializerOptions) => {
  const pathname = usePathname();
  const { setMap, setStoreList, setMyPosition } = useMapStore();

  useEffect(() => {
    const tryInitMap = () => {
      if (!window.naver || !window.naver.maps) {
        setTimeout(tryInitMap, 100);
        return;
      }

      const mapContainer = document.getElementById(MAP_CONTAINER_ID);
      if (!mapContainer) return;

      const center = new window.naver.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
      const map = new window.naver.maps.Map(mapContainer, {
        center,
        zoom: 15,
      });

      setMap(map);
      options?.onMapInit?.(map);

      navigator.geolocation?.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          const current = new window.naver.maps.LatLng(latitude, longitude);
          map.setCenter(current);

          setMyPosition(current);

          try {
            const res = await getMapList({
              size: 10,
              latitude,
              longitude,
              productSortOption: "DISTANCE_ASC",
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
    };
    tryInitMap();
  }, [options, pathname]);
};
