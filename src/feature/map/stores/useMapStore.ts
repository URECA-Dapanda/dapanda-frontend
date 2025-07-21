import { create } from "zustand";
import type { MapType } from "@/feature/map/types/mapType";

interface MapState {
  map: naver.maps.Map | null;
  storeList: MapType[];
  setMap: (map: naver.maps.Map) => void;
  setStoreList: (list: MapType[]) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  storeList: [],
  setMap: (map) => set({ map }),
  setStoreList: (list) => set({ storeList: list }),
}));
