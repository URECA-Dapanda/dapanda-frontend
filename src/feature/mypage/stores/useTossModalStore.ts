import { create } from "zustand";

interface TossModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useTossModalStore = create<TossModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));