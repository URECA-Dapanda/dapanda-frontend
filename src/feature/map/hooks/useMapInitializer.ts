import { useEffect } from "react";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import type { MapType } from "@/feature/map/types/mapType";
import { MAP_CONTAINER_ID, DEFAULT_LOCATION } from "@/feature/map/constants/map";
import { getMapList } from "@/feature/map/api/mapRequest";

interface UseMapInitializerOptions {
  onStoreListUpdate?: (list: MapType[]) => void;
  onMapInit?: (map: naver.maps.Map) => void;
}

export const useMapInitializer = (options?: UseMapInitializerOptions) => {
  const { setMap, setStoreList } = useMapStore();

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

          new window.naver.maps.Marker({
            position: current,
            map,
            icon: {
              content:
                '<div style="background:#e6007e;width:12px;height:12px;border-radius:9999px;"></div>',
            },
          });

          try {
            const res = await getMapList({
              size: 10,
              latitude,
              longitude,
              productSortOption: "PRICE_ASC",
              open: true,
            });

            setStoreList(res.items);
            options?.onStoreListUpdate?.(res.items);
          } catch (e) {
            alert("와이파이 목록을 불러오는 데 실패했습니다.");
            console.error(e);
          }
        },
        () => alert("위치 정보를 가져올 수 없습니다."),
        { enableHighAccuracy: true }
      );
    };
    tryInitMap();
  }, [options]);
};
