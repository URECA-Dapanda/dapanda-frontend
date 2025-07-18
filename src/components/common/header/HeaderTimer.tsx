"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/stores/useTimerStore";
import EndOfUseModal from "@/feature/map/components/sections/product/EndOfUseModal";

export default function HeaderTimer() {
  const {
    remainingTime,
    isActive,
    decrement,
    setOpenModal,
    hasEnded,
    reset, // 상태 초기화용
    endTimer,
  } = useTimerStore();

  // 타이머 1초씩 감소
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => decrement(), 1000);
    return () => clearInterval(interval);
  }, [isActive, decrement]);

  useEffect(() => {
    if (remainingTime === 0 && isActive) {
      endTimer(); // ✅ 타이머 종료 및 모달 닫기
    }
  }, [remainingTime, isActive, endTimer]);

  // 종료되었으면 모달 띄우고 타이머 표시 안함
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
