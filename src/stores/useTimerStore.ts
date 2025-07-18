import { create } from "zustand";

interface TimerStore {
  remainingTime: number; // 남은 시간(초)
  isActive: boolean; // 타이머 작동 중 여부
  openModal: boolean; // 현재 타이머 모달 open 여부
  hasEnded: boolean; // ⬅️ 종료 모달용 상태 추가

  startTimer: (duration: number) => void;
  decrement: () => void;
  stopTimer: () => void;
  setOpenModal: (open: boolean) => void;
  reset: () => void; // ⬅️ 타이머 초기화 (선택)
  endTimer: () => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  remainingTime: 0,
  isActive: false,
  openModal: false,
  hasEnded: false, // ⬅️ 종료 상태 초기값

  startTimer: (duration) =>
    set({
      remainingTime: duration,
      isActive: true,
      hasEnded: false, // 타이머 시작 시 초기화
    }),

  decrement: () =>
    set((state) => {
      const newTime = state.remainingTime - 1;

      if (newTime <= 0) {
        return {
          remainingTime: 0,
          isActive: false,
          hasEnded: true, // ⬅️ 타이머 종료 시 상태 업데이트
        };
      }

      return { remainingTime: newTime };
    }),

  endTimer: () =>
    set(() => ({
      isActive: false,
      remainingTime: 0,
      hasEnded: true,
      openModal: false, // ✅ 기존 모달 닫기
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
