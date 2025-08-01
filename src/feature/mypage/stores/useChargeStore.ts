import { create } from "zustand";

interface ChargeStoreType {
  charge: string;
}

interface ChargeProps extends Partial<ChargeStoreType> {
  setCharge: (newCharge: string) => void;
}

export const useChargeStore = create<ChargeProps>((set) => ({
  charge: undefined,
  setCharge: (newCharge) => set({ charge: newCharge }),
}));
