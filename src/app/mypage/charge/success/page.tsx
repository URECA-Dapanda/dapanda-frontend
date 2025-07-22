"use client";

import { useHandleTossSuccess } from "@/feature/mypage/hooks/useHandleTossSuccess";

export default function ChargeSuccessPage() {
  useHandleTossSuccess();

  return <div className="p-8 text-center">결제 처리 중입니다...</div>;
}
