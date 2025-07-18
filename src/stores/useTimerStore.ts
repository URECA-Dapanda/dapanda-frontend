import { create } from "zustand";

interface TimerStore {
  remainingTime: number; // 초 단위
  isActive: boolean;
  openModal: boolean;
  startTimer: (duration: number) => void;
  decrement: () => void;
  stopTimer: () => void;
  setOpenModal: (open: boolean) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  remainingTime: 0,
  isActive: false,
  openModal: false,
  startTimer: (duration) => set({ remainingTime: duration, isActive: true }),
  decrement: () =>
    set((state) => ({
      remainingTime: state.remainingTime > 0 ? state.remainingTime - 1 : 0,
    })),
  stopTimer: () => set({ isActive: false }),
  setOpenModal: (open) => set({ openModal: open }),
}));
