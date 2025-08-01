import { create } from "zustand";

interface HeaderState {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  isVisible: true,
  setIsVisible: (value) => set({ isVisible: value }),
}));
