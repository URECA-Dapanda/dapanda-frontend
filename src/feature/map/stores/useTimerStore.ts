import { create } from "zustand";

interface TimerStore {
  remainingTime: number;
  duration: number;
  isActive: boolean;
  openModal: boolean;
  hasEnded: boolean;
  timerId: NodeJS.Timeout | null;

  startTimer: (duration: number) => void;
  decrement: () => void;
  stopTimer: () => void;
  setOpenModal: (open: boolean) => void;
  reset: () => void;
  endTimer: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  remainingTime: 0,
  duration: 0,
  isActive: false,
  openModal: false,
  hasEnded: false,
  timerId: null,

  startTimer: (duration) => {
    console.log("타이머 시작됨!");
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
        openModal: true,
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
}));
