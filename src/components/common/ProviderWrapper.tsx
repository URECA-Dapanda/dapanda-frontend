"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";
import TimerContainer from "@feature/map/components/sections/timer/TimeContainer";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  useWebSocketConnection();

  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
      <TimerContainer />{" "}
    </QueryClientProvider>
  );
}
