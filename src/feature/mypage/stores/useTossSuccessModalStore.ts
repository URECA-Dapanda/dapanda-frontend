import { create } from "zustand";
import { TossModalState } from "@feature/mypage/types/modalTypes";

export const useTossSuccessModalStore = create<TossModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
