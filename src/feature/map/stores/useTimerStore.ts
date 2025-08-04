import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerStore {
  remainingTime: number;
  duration: number;
  isActive: boolean;
  openModal: boolean;
  hasEnded: boolean;
  timerId: NodeJS.Timeout | null;
  tradeId: number | null;
  startTime: string | null;
  endTime: string | null;

  startTimer: (duration: number, tradeId?: number, startTime?: string, endTime?: string) => void;
  decrement: () => void;
  stopTimer: () => void;
  setOpenModal: (open: boolean) => void;
  reset: () => void;
  endTimer: () => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      remainingTime: 0,
      duration: 0,
      isActive: false,
      openModal: false,
      hasEnded: false,
      timerId: null,
      tradeId: null,
      startTime: null,
      endTime: null,

      startTimer: (duration, tradeId, startTime, endTime) => {
        const interval = setInterval(() => {
          get().decrement();
        }, 1000);

        set({
          remainingTime: duration,
          duration,
          isActive: true,
          hasEnded: false,
          openModal: false,
          timerId: interval,
          tradeId: tradeId ?? null,
          startTime: startTime ?? null,
          endTime: endTime ?? null,
        });
      },

      decrement: () => {
        const { remainingTime, timerId } = get();
        const newTime = remainingTime - 1;

        if (newTime <= 0) {
          if (timerId) clearInterval(timerId);
          set({
            remainingTime: 0,
            isActive: false,
            hasEnded: true,
            openModal: false,
            timerId: null,
          });
        } else {
          set({ remainingTime: newTime });
        }
      },

      stopTimer: () => {
        const { timerId } = get();
        if (timerId) clearInterval(timerId);
        set({ isActive: false, timerId: null });
      },

      setOpenModal: (open) => set({ openModal: open }),

      reset: () => {
        const { timerId } = get();
        if (timerId) clearInterval(timerId);
        set({
          remainingTime: 0,
          duration: 0,
          isActive: false,
          openModal: false,
          hasEnded: false,
          timerId: null,
          tradeId: null,
          startTime: null,
          endTime: null,
        });
      },

      endTimer: () => {
        const { timerId } = get();
        if (timerId) clearInterval(timerId);
        set({
          isActive: false,
          remainingTime: 0,
          hasEnded: true,
          openModal: false,
          timerId: null,
        });
      },
    }),
    {
      name: "timer-storage",
      partialize: (state) => ({
        remainingTime: state.remainingTime,
        duration: state.duration,
        isActive: state.isActive,
        hasEnded: state.hasEnded,
        startTime: state.startTime,
        endTime: state.endTime,
        tradeId: state.tradeId,
      }),
    }
  )
);
