import { create } from "zustand";

interface ConfigType {
  title: string;
  handleShowSellSheet: () => void;
}

interface ConfigProps extends Partial<ConfigType> {
  setTitle: (newTitle: string) => void;
  setHandleShowSellSheet: (callback: () => void) => void;
}

export const useConfigStore = create<ConfigProps>((set) => ({
  title: "DaPanDa",
  handleShowSellSheet: () => {},
  setTitle: (newTitle) => {
    set({ title: newTitle });
  },
  setHandleShowSellSheet: (callback) => {
    set({ handleShowSellSheet: callback });
  },
}));
