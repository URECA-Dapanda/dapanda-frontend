import { create } from "zustand";

interface CashSuccessModalState {
  isOpen: boolean;
  mode: "charge" | "refund";
  open: (mode: "charge" | "refund") => void;
  close: () => void;
}

export const useCashSuccessModalStore = create<CashSuccessModalState>((set) => ({
  isOpen: false,
  mode: "charge",
  open: (mode) => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
}));