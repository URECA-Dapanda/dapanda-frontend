// src/feature/map/hooks/useMapInitializer.ts

import { useEffect } from "react";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import type { MapType } from "@/feature/map/types/mapType";
import { MAP_CONTAINER_ID, DEFAULT_LOCATION } from "@/feature/map/constants/map";
import { mockMapList } from "@/lib/mock/map";

interface UseMapInitializerOptions {
  onStoreListUpdate?: (list: MapType[]) => void;
  onMapInit?: (map: naver.maps.Map) => void;
}

export const useMapInitializer = (options?: UseMapInitializerOptions) => {
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
        ({ coords }) => {
          const current = new window.naver.maps.LatLng(coords.latitude, coords.longitude);
          map.setCenter(current);

          setMyPosition(current); // ✅ 마커는 별도로

          const dummyList = mockMapList({ lat: coords.latitude, lng: coords.longitude });
          setStoreList(dummyList);
          options?.onStoreListUpdate?.(dummyList);
        },
        () => alert("위치 정보를 가져올 수 없습니다."),
        { enableHighAccuracy: true }
      );
    };

    tryInitMap();
  }, [options]);
};
