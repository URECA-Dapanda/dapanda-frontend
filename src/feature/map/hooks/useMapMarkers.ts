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
      if (store.title === "내 위치") return;
      const [lat, lng] = store.location.split(",").map(Number);
      if (isNaN(lat) || isNaN(lng)) return;

      const position = new window.naver.maps.LatLng(lat, lng);

      let iconUrl = "";
      if (store.type === "핫스팟") {
        iconUrl = "/hotspot-pin.svg";
      } else if (store.type === "와이파이") {
        iconUrl = store.open ? "/wifi-pin.svg" : "/wifi-dis-pin.svg";
      }

      const marker = new window.naver.maps.Marker({
        position,
        map,
        title: store.title,
        icon: {
          url: iconUrl,
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });

      if (options?.onMarkerClick) {
        window.naver.maps.Event.addListener(marker, "click", () => {
          options.onMarkerClick?.(store);
        });
      }

      newMarkerMap.set(store.productId, marker);
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
