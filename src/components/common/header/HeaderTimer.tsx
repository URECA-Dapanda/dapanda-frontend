"use client";

import { useEffect } from "react";
import EndOfUseModal from "@/feature/map/components/sections/timer/TimerEndModal";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";

export default function HeaderTimer() {
  const { remainingTime, isActive, decrement, setOpenModal, hasEnded, reset, endTimer } =
    useTimerStore();

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => decrement(), 1000);
    return () => clearInterval(interval);
  }, [isActive, decrement]);

  useEffect(() => {
    if (remainingTime === 0 && isActive) {
      endTimer();
    }
  }, [remainingTime, isActive, endTimer]);

  if (hasEnded) {
    return <EndOfUseModal open={true} onClose={reset} />;
  }

  if (!isActive || remainingTime <= 0) return null;

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
