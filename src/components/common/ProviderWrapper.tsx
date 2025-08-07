"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import TimerContainer from "@/feature/map/components/sections/timer/TimeContainer";
import ChatContainer from "@/feature/chat/components/ChatContainer";
import { useSubscribeTimer } from "@hooks/useSubscribeTimer";
import { useInitializeTimerFromServer } from "@hooks/useInitializeTimerFormServer";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  useWebSocketConnection();
  // useSubscribeTimerOnce();
  useSubscribeTimer();

  useInitializeTimerFromServer();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <TimerContainer />
      <ChatContainer />
    </QueryClientProvider>
  );
}
