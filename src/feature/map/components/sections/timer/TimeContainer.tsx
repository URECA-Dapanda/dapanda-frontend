"use client";

import TimerModal from "@/feature/map/components/sections/timer/TimerModal";
import TimerEndModal from "@/feature/map/components/sections/timer/TimerEndModal";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";

export default function TimerContainer() {
  const { hasEnded, openModal, reset } = useTimerStore();

  return (
    <>
      {openModal && <TimerModal />}
      {hasEnded && <TimerEndModal open={true} onClose={reset} />}
    </>
  );
}
