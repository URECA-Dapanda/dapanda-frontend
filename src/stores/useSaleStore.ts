import { create } from "zustand";

type SaleStore = {
  handleShowSellSheet: () => void;
  setHandleShowSellSheet: (callback: () => void) => void;
};

export const useSaleStore = create<SaleStore>((set) => ({
  handleShowSellSheet: () => {},
  setHandleShowSellSheet: (callback) => {
    set({ handleShowSellSheet: callback });
  },
}));
