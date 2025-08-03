"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
// import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import type { AlarmMessage } from "@type/Alarm";
import TimerContainer from "@/feature/map/components/sections/timer/TimeContainer";
import { useAuth } from "@/hooks/useAuth";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  const { user, isLoading } = useAuth(); // ✅ user 직접 받아옴
  const userId = user?.memberId; // ✅ 여기서 직접 꺼냄

  const { connect, isConnected, subscribeToChannel } = useWebSocketStore();
  const { startTimer } = useTimerStore();

  useEffect(() => {
    console.log("🔥 ProviderWrapper useEffect 실행됨:", { isLoading, userId });
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
      console.log("🔔 알림 구독 시작:", channelId);
      subscribeToChannel(channelId, (msg: AlarmMessage) => {
        try {
          console.log("🛎 알림 원본 수신:", msg);

          const start = new Date(`1970-01-01T${msg.startTime}`);
          const end = new Date(`1970-01-01T${msg.endTime}`);
          const durationSec = (end.getTime() - start.getTime()) / 1000;

          console.log("⏱ 타이머 계산 완료:", {
            start: msg.startTime,
            end: msg.endTime,
            durationSec,
          });

          startTimer(durationSec);
        } catch (e) {
          console.error("⛔ 알림 수신 처리 중 오류:", e);
        }
      });
    }
  }, [userId, isConnected]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <TimerContainer />
    </QueryClientProvider>
  );
}
