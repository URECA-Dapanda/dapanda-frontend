"use client";

import { useHandleTossSuccess } from "@/feature/mypage/hooks/useHandleTossSuccess";
import { Receipt } from "lucide-react";

export default function ChargeSuccessPage() {
  useHandleTossSuccess();

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-white text-primary animate-fade-in">
      <div className="animate-spin-slow mb-12">
        <Receipt className="w-20 h-20 text-primary" />
      </div>
      <div className="text-xl font-semibold text-gray-800">
        결제 처리 중입니다...
      </div>
      <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
    </div>
  );
}
