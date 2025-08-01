"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  useWebSocketConnection();

  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}
