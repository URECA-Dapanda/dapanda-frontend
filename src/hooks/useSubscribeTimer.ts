"use client";

import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import type { AlarmMessage } from "@type/Alarm";

export const useSubscribeTimer = (userId?: number, isLoading?: boolean) => {
  const { connect, isConnected, subscribeToChannel } = useWebSocketStore();
  const { startTimer } = useTimerStore();

  useEffect(() => {
    if (isLoading) return;

    if (userId) {
      connect().catch((err) => console.error("WebSocket 연결 실패:", err));
    }
  }, [isLoading, userId, connect]);

  useEffect(() => {
    if (userId && isConnected) {
      const channelId = `alarm${userId}`;

      subscribeToChannel(channelId, (msg: AlarmMessage) => {
        try {
          const now = new Date();

          // startTime, endTime 파싱 (오늘 날짜 기준)
          const [startHour, startMinute] = msg.startTime.split(":").map(Number);
          const [endHour, endMinute] = msg.endTime.split(":").map(Number);

          const start = new Date(now);
          start.setHours(startHour, startMinute, 0, 0);

          const end = new Date(now);
          end.setHours(endHour, endMinute, 0, 0);

          const remainingSec = Math.floor((end.getTime() - now.getTime()) / 1000);

          if (remainingSec > 0) {
            startTimer(remainingSec, msg.tradeId, msg.startTime, msg.endTime);
          }
        } catch (e) {
          console.error("알림 수신 처리 중 오류:", e);
        }
      });
    }
  }, [userId, isConnected, subscribeToChannel, startTimer]);
};
