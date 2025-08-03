"use client";

import TimerModal from "@/feature/map/components/sections/timer/TimerModal";
import TimerEndModal from "@/feature/map/components/sections/timer/TimerEndModal";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import { useEffect } from "react";

export default function TimerContainer() {
  const { hasEnded, openModal, reset } = useTimerStore();

  useEffect(() => {
    console.log("🟢 TimerContainer 상태:", { openModal, hasEnded });
  }, [openModal, hasEnded]);

  return (
    <>
      {openModal && <TimerModal />}
      {hasEnded && <TimerEndModal open={true} onClose={reset} />}
    </>
  );
}
