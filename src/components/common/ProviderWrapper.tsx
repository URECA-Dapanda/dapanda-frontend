"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import TimerContainer from "@/feature/map/components/sections/timer/TimeContainer";
import { useAuth } from "@/hooks/useAuth";
import { useSubscribeTimer } from "@hooks/useSubscribeTimer";
import { useInitializeTimerFromServer } from "@hooks/useInitializeTimerFormServer";
import { useSubscribeTimerOnce } from "@hooks/subscribeToTimerOnce";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";
import { initMixpanel } from "@lib/mixpanel";
import mixpanel from "mixpanel-browser";
import PageViewTracker from "@components/common/PageViewTracker";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  const { user, isLoading } = useAuth();
  const userId = user?.memberId;

  useAuth();
  useWebSocketConnection();
  useSubscribeTimerOnce(userId);
  useSubscribeTimer(userId, isLoading);
  useInitializeTimerFromServer();

  useEffect(() => {
    initMixpanel();
  }, []);

  useEffect(() => {
    if (userId) {
      mixpanel.identify(userId.toString());
      mixpanel.people.set({
        $name: user.name,
      });
    }
  }, [userId]);
  return (
    <QueryClientProvider client={queryClient}>
      <PageViewTracker />
      {children}
      <TimerContainer />
    </QueryClientProvider>
  );
}
