import { create } from "zustand";

interface TossSuccessModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useTossSuccessModalStore = create<TossSuccessModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
