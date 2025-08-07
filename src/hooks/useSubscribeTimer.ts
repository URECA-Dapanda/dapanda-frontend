"use client";

import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import type { AlarmMessage } from "@type/Alarm";
import { useAuth } from "./useAuth";

export const useSubscribeTimer = () => {
  const isConnected = useWebSocketStore((store) => store.isConnected);
  const subscribeToChannel = useWebSocketStore((store) => store.subscribeToChannel);
  const { startTimer } = useTimerStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.memberId && isConnected) {
      const channelId = `alarm/${user?.memberId}`;

      subscribeToChannel(channelId, (msg: AlarmMessage) => {
        try {
          if (msg.eventState !== "START") return;
          const now = new Date();

          // startTime, endTime 파싱 (오늘 날짜 기준)
          const [startHour, startMinute] = msg.startTime.split(":").map(Number);
          const [endHour, endMinute] = msg.endTime.split(":").map(Number);

          const start = new Date(now);
          start.setHours(startHour, startMinute, 0, 0);

          const end = new Date(now);
          end.setHours(endHour, endMinute, 0, 0);

          const remainingSec = Math.floor((end.getTime() - now.getTime()) / 1000);

          if (msg.eventState === "START" && remainingSec > 0) {
            startTimer(remainingSec, msg.tradeId, msg.startTime, msg.endTime);
          }
        } catch (e) {
          console.debug("알림 수신 처리 중 오류:", e);
        }
      });
    }
  }, [isConnected, subscribeToChannel, startTimer, user]);
};
