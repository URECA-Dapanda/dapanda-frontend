"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";

export const useInitializeTimerFromServer = () => {
  const { startTime, endTime, isActive, hasEnded, tradeId, startTimer, endTimer } = useTimerStore();

  useEffect(() => {
    if (!startTime || !endTime || isActive || hasEnded) return;

    const now = new Date();

    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const start = new Date(now);
    start.setHours(startHour, startMin, 0, 0);

    const end = new Date(now);
    end.setHours(endHour, endMin, 0, 0);

    const remainingSec = Math.floor((end.getTime() - now.getTime()) / 1000);

    if (remainingSec <= 0) {
      endTimer(); // 만료됨
    } else {
      startTimer(remainingSec, tradeId ?? undefined, startTime, endTime);
    }

    startTimer(remainingSec, tradeId ?? undefined, startTime, endTime);
  }, [startTime, endTime, isActive, hasEnded, tradeId, startTimer, endTimer]);
};
