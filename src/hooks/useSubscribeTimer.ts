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
      console.log("✅ userId 확인됨. WebSocket 연결 시도");
      connect().catch((err) => console.error("WebSocket 연결 실패:", err));
    } else {
      console.warn("⚠️ userId 없음. WebSocket 연결 안 함");
    }
  }, [isLoading, userId, connect]);

  useEffect(() => {
    if (userId && isConnected) {
      const channelId = `alarm${userId}`;
      console.log("🔔 타이머 WebSocket 채널 구독 시작:", channelId);
      subscribeToChannel(channelId, (msg: AlarmMessage) => {
        try {
          const start = new Date(`1970-01-01T${msg.startTime}`);
          const end = new Date(`1970-01-01T${msg.endTime}`);
          const durationSec = (end.getTime() - start.getTime()) / 1000;

          console.log("⏱ 수신된 타이머 duration(sec):", durationSec);
          startTimer(durationSec, msg.tradeId);
        } catch (e) {
          console.error("⛔ 알림 수신 처리 중 오류:", e);
        }
      });
    }
  }, [userId, isConnected, subscribeToChannel, startTimer]);
};
