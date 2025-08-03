"use client";

import { useEffect } from "react";
import EndOfUseModal from "@/feature/map/components/sections/timer/TimerEndModal";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";

export default function HeaderTimer() {
  const remainingTime = useTimerStore((state) => state.remainingTime);
  const isActive = useTimerStore((state) => state.isActive);
  const decrement = useTimerStore((state) => state.decrement);
  const setOpenModal = useTimerStore((state) => state.setOpenModal);
  const hasEnded = useTimerStore((state) => state.hasEnded);
  const reset = useTimerStore((state) => state.reset);
  const endTimer = useTimerStore((state) => state.endTimer);
  const timerId = useTimerStore((state) => state.timerId);

  useEffect(() => {
    if (!isActive) return;
    if (isActive && remainingTime > 0 && !timerId) {
      const interval = setInterval(() => decrement(), 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, decrement, timerId]);

  useEffect(() => {
    if (remainingTime === 0 && isActive) {
      endTimer();
    }
  }, [remainingTime, isActive, endTimer]);

  if (!isActive || remainingTime <= 0) {
    return hasEnded ? <EndOfUseModal open={true} onClose={reset} /> : null;
  }

  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");

  return (
    <button
      onClick={() => setOpenModal(true)}
      className="text-white bg-primary rounded-full px-8 py-4 text-sm font-semibold"
    >
      {minutes}:{seconds}
    </button>
  );
}
