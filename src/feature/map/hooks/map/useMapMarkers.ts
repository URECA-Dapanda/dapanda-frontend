import { useEffect, useRef } from "react";
import type { MapType } from "@/feature/map/types/mapType";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import type {
  MarkerClusteringConstructor,
  MarkerClusteringInstance,
  ClusterMarker,
} from "@/types/markerClustering";

interface UseMapMarkersOptions {
  onMarkerClick?: (store: MapType) => void;
}

export const useMapMarkers = (
  map: naver.maps.Map | null,
  storeList: MapType[],
  options?: UseMapMarkersOptions
) => {
  const markerMapRef = useRef<Map<number, naver.maps.Marker>>(new Map());
  const clustererRef = useRef<MarkerClusteringInstance | null>(null);
  const currentMarkerRef = useRef<naver.maps.Marker | null>(null);
  const setIsManualPan = useMapStore((state) => state.setIsManualPan);

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

    clustererRef.current?.setMap(null);
    clustererRef.current = null;

    markerMapRef.current.forEach((marker) => marker.setMap(null));
    markerMapRef.current.clear();

    currentMarkerRef.current?.setMap(null);
    currentMarkerRef.current = null;

    const newMarkerMap = new Map<number, naver.maps.Marker>();
    const markers: naver.maps.Marker[] = [];

    const currentPin = storeList.find((s) => s.title === "내 위치");
    if (currentPin) {
      const [lat, lng] = currentPin.location.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        currentMarkerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map,
          icon: {
            content: `
              <div style="
                background: #e6007e;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 0 4px rgba(0,0,0,0.3);
              "></div>`,
            size: new window.naver.maps.Size(20, 20),
            anchor: new window.naver.maps.Point(10, 10),
          },
        });
      }
    }

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
        map: undefined,
        title: store.title,
        icon: {
          url: iconUrl,
          size: new window.naver.maps.Size(50, 52),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(25, 26),
        },
      });

      if (options?.onMarkerClick) {
        window.naver.maps.Event.addListener(marker, "click", () => {
          setIsManualPan(true);
          map.setCenter(position);
          map.setZoom(16);
          options.onMarkerClick?.(store);
        });
      }

      markers.push(marker);
      newMarkerMap.set(store.productId, marker);
    });

    let retry = 0;
    const maxRetry = 10;

    const interval = setInterval(() => {
      const Clustering = window.MarkerClustering as MarkerClusteringConstructor | undefined;
      if (Clustering && typeof Clustering === "function") {
        clearInterval(interval);

        const zoom = map.getZoom();
        const gridSize = zoom >= 17 ? 60 : zoom >= 15 ? 90 : zoom >= 13 ? 120 : 150;

        const clusterer = new Clustering({
          map,
          markers,
          maxZoom: 17,
          gridSize,
          disableClickZoom: false,
          minClusterSize: 2,
          icons: [
            {
              content: `
                <div style="
                  width: 48px;
                  height: 48px;
                  z-index:50;
                  border-radius: 50%;
                  background: radial-gradient(circle, rgba(11, 78, 239, 0.9) 0%, rgba(11, 78, 239, 0.6) 60%, rgba(11, 78, 239, 0.3) 100%);
                  color: white;
                  font-weight: bold;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                ">
                  <span id="cluster-count">{n}</span>
                </div>`,
              size: new window.naver.maps.Size(40, 40),
              anchor: new window.naver.maps.Point(20, 20),
            },
          ],
          stylingFunction: (clusterMarker: ClusterMarker, count: number) => {
            const el = clusterMarker.getElement()?.querySelector("span#cluster-count");
            if (el) el.innerHTML = String(count);
          },
        });

        clustererRef.current = clusterer;
        markerMapRef.current = newMarkerMap;
      } else {
        retry++;
        if (retry >= maxRetry) {
          clearInterval(interval);
          markers.forEach((marker) => marker.setMap(map));
          markerMapRef.current = newMarkerMap;
        }
      }
    }, 300);

    return () => {
      clearInterval(interval);
      clustererRef.current?.setMap(null);
      clustererRef.current = null;

      currentMarkerRef.current?.setMap(null);
      currentMarkerRef.current = null;

      markerMapRef.current.forEach((marker) => marker.setMap(null));
      markerMapRef.current.clear();
    };
  }, [map, storeList, options]);
};
