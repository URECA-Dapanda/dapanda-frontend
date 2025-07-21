import { create } from "zustand";

interface TimerStore {
  remainingTime: number;
  duration: number;
  isActive: boolean;
  openModal: boolean;
  hasEnded: boolean;

  startTimer: (duration: number) => void;
  decrement: () => void;
  stopTimer: () => void;
  setOpenModal: (open: boolean) => void;
  reset: () => void;
  endTimer: () => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  remainingTime: 0,
  duration: 0,
  isActive: false,
  openModal: false,
  hasEnded: false,

  startTimer: (duration) =>
    set({
      remainingTime: duration,
      duration,
      isActive: true,
      hasEnded: false,
    }),

  decrement: () =>
    set((state) => {
      const newTime = state.remainingTime - 1;

      if (newTime <= 0) {
        return {
          remainingTime: 0,
          isActive: false,
          hasEnded: true,
        };
      }

      return { remainingTime: newTime };
    }),

  endTimer: () =>
    set(() => ({
      isActive: false,
      remainingTime: 0,
      hasEnded: true,
      openModal: false,
    })),

  stopTimer: () => set({ isActive: false }),

  setOpenModal: (open) => set({ openModal: open }),

  reset: () =>
    set({
      remainingTime: 0,
      isActive: false,
      openModal: false,
      hasEnded: false,
    }),
}));
