import { create } from "zustand";

interface DataFilterState {
  dataAmount: number | null;
  setDataAmount: (amount: number) => void;
  clearDataAmount: () => void;
}

export const useDataFilterStore = create<DataFilterState>((set) => ({
  dataAmount: null,
  setDataAmount: (amount) => set({ dataAmount: amount }),
  clearDataAmount: () => set({ dataAmount: null }),
}));
