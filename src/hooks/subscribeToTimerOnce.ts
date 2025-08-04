"use client";

import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import type { AlarmMessage } from "@type/Alarm";

export const useSubscribeTimerOnce = (userId?: number) => {
  const { subscribeToChannel } = useWebSocketStore();
  const { startTimer } = useTimerStore();

  useEffect(() => {
    if (!userId) return;

    const channelId = `alarm${userId}`;

    subscribeToChannel(channelId, (msg: AlarmMessage) => {
      try {
        const now = new Date();
        const end = new Date(`1970-01-01T${msg.endTime}`);
        const remainingSec = Math.floor((end.getTime() - now.getTime()) / 1000);

        if (remainingSec > 0) {
          startTimer(remainingSec, msg.tradeId, msg.startTime, msg.endTime);
        }
      } catch (e) {
        console.error("알림 처리 실패:", e);
      }
    });
  }, [userId, subscribeToChannel, startTimer]);
};
