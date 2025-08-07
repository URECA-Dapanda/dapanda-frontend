"use client";

import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import type { AlarmMessage } from "@type/Alarm";
import { useAuth } from "./useAuth";
import dayjs from "dayjs";

export const useSubscribeTimerOnce = () => {
  const subscribeToChannel = useWebSocketStore((store) => store.subscribeToChannel);
  const startTimer = useTimerStore((state) => state.startTimer);
  const remainingTime = useTimerStore((state) => state.remainingTime);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.memberId) return;
    const channelId = `alarm/${user?.memberId}`;

    const tmp = () =>
      subscribeToChannel(channelId, (msg: AlarmMessage) => {
        try {
          const now = new Date();
          const end = dayjs(msg.endTime).toDate();
          const remainingSec = Math.floor((end.getTime() - now.getTime()) / 1000);
          if (remainingSec > 0) {
            startTimer(remainingSec, msg.tradeId, msg.startTime, msg.endTime);
          }
        } catch (e) {
          console.debug("알림 처리 실패:", e);
        }
      });
    tmp();
  }, [subscribeToChannel, startTimer, user, remainingTime]);
};
