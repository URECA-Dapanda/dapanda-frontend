"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { confirmPayment, verifyPaymentAmount } from "@/feature/mypage/apis/payment";
import { showErrorToast } from "@lib/toast";

export const useHandleTossSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = Number(searchParams.get("amount"));

    const handle = async () => {
      if (!paymentKey || !orderId || !amount) {
        showErrorToast("잘못된 결제 정보입니다.");
        router.replace("/mypage?error=invalid");
        return;
      }

      try {
        const verifyRes = await verifyPaymentAmount(orderId, amount);
        if (verifyRes.data.code !== 0) {
          showErrorToast("결제 금액 검증 실패");
          router.replace("/mypage?error=verify");
          return;
        }

        const confirmRes = await confirmPayment(paymentKey, orderId, amount);
        if (confirmRes.data.code !== 0) {
          showErrorToast("결제 승인 실패");
          router.replace("/mypage?error=confirm");
          return;
        }
        router.replace("/mypage?payment=success");
      } catch {
        showErrorToast("결제 처리 중 오류 발생");
        router.replace("/mypage?error=unknown");
      }
    };

    handle();
  }, [searchParams]);
};
