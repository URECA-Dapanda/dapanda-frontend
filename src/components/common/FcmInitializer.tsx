"use client";

import { useEffect } from "react";
import { requestFcmToken } from "@feature/notification/utils/requestFcmToken";
import { onForegroundMessage } from "@feature/notification/utils/onForegroundMessage";

export default function FcmInitializer() {
  useEffect(() => {
    requestFcmToken();         // 권한 요청 + 토큰 저장
    onForegroundMessage();     // 알림 수신 리스너 등록
  }, []);

  return null;
}