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
}

export const useMapStore = create<MapState>((set) => ({
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
}));
