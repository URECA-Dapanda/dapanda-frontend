import { create } from "zustand";
import type { MapType } from "@/feature/map/types/mapType";

interface MapState {
  map: naver.maps.Map | null;
  storeList: MapType[];
  myPosition: naver.maps.LatLng | null;
  selectedStore: MapType | null;
  setMap: (map: naver.maps.Map) => void;
  setStoreList: (list: MapType[]) => void;
  setMyPosition: (pos: naver.maps.LatLng) => void;
  setSelectedStore: (store: MapType | null) => void;
  isManualPan: boolean;
  setIsManualPan: (v: boolean) => void;
  setMapCenter: (lat: number, lng: number) => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  map: null,
  storeList: [],
  myPosition: null,
  selectedStore: null,
  setMap: (map) => set({ map }),
  setStoreList: (list) => set({ storeList: list }),
  setMyPosition: (pos) => set({ myPosition: pos }),
  setSelectedStore: (store) => set({ selectedStore: store }),
  isManualPan: false,
  setIsManualPan: (v) => set({ isManualPan: v }),
  setMapCenter: (lat, lng) => {
    const map = get().map;
    if (map) {
      const currentZoom = map.getZoom();
      const originalCenter = new naver.maps.LatLng(lat, lng);

      const projection = map.getProjection();
      if (!projection) return;

      const point = projection.fromCoordToPoint(originalCenter);
      const offsetY = 100 / Math.pow(2, currentZoom);
      const adjustedPoint = new naver.maps.Point(point.x, point.y + offsetY);
      const adjustedLatLng = projection.fromPointToCoord(adjustedPoint);

      map.panTo(adjustedLatLng);
    }
  },
}));
