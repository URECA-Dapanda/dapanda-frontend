"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import TimerContainer from "@/feature/map/components/sections/timer/TimeContainer";
import { useAuth } from "@/hooks/useAuth";
import { useSubscribeTimer } from "@hooks/useSubscribeTimer";
import { useInitializeTimerFromServer } from "@hooks/useInitializeTimerFormServer";
import { useSubscribeTimerOnce } from "@hooks/subscribeToTimerOnce";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  const { user, isLoading } = useAuth();
  const userId = user?.memberId;

  useAuth();
  useWebSocketConnection();
  useSubscribeTimerOnce(userId);
  useSubscribeTimer(userId, isLoading);
  useInitializeTimerFromServer();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <TimerContainer />
    </QueryClientProvider>
  );
}
