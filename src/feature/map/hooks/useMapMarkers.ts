import { useEffect, useRef } from "react";
import type { MapType } from "@/feature/map/types/mapType";

interface UseMapMarkersOptions {
  onMarkerClick?: (store: MapType) => void;
}

export const useMapMarkers = (
  map: naver.maps.Map | null,
  storeList: MapType[],
  options?: UseMapMarkersOptions
) => {
  const markerMapRef = useRef<Map<number, naver.maps.Marker>>(new Map());

  useEffect(() => {
    if (!map || !window.naver) return;

    const newMarkerMap = new Map<number, naver.maps.Marker>();

    storeList.forEach((store) => {
      const [lat, lng] = store.location.split(",").map(Number);
      if (isNaN(lat) || isNaN(lng)) return;

      const position = new window.naver.maps.LatLng(lat, lng);

      const marker = new window.naver.maps.Marker({
        position,
        map,
        title: store.title,
      });

      if (options?.onMarkerClick) {
        window.naver.maps.Event.addListener(marker, "click", () => {
          options.onMarkerClick?.(store);
        });
      }

      newMarkerMap.set(store.id, marker);
    });

    // 이전 마커 제거
    markerMapRef.current.forEach((marker) => marker.setMap(null));
    markerMapRef.current = newMarkerMap;

    return () => {
      // 언마운트 시 마커 정리
      markerMapRef.current.forEach((marker) => marker.setMap(null));
      markerMapRef.current.clear();
    };
  }, [map, storeList, options]);
};
