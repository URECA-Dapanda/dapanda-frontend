"use client";

import { useEffect } from "react";
import { requestFcmToken } from "@feature/notification/utils/requestFcmToken";
import { onForegroundMessage } from "@feature/notification/utils/onForegroundMessage";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@hooks/useAuth";

export default function FcmInitializer() {
  const { isLogin } = useAuth();
  useQuery({
    queryFn: requestFcmToken,
    queryKey: ["requestFcmToken"],
    enabled: !!isLogin,
  });
  useEffect(() => {
    onForegroundMessage(); // 알림 수신 리스너 등록
  }, []);

  return null;
}
