"use client";
import {
  loadTossPayments,
  ANONYMOUS,
  TossPaymentsSDK,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { savePaymentAmount } from "@feature/mypage/apis/payment";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const useTossPayment = () => {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

  const widgetRef = { current: null as TossPaymentsWidgets | null };
  const orderIdRef = { current: "" };
  const amountRef = { current: 0 };

  const renderTossPayment = async (chargeStr: string) => {
    const amount = Number(chargeStr);
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("유효한 결제 금액을 입력해주세요.");
      return;
    }

    const orderId = `order-${uuidv4()}`;
    const tossPayments: TossPaymentsSDK = await loadTossPayments(clientKey);
    const widgets: TossPaymentsWidgets = tossPayments.widgets({ customerKey: ANONYMOUS });

    await savePaymentAmount(orderId, amount);

    await widgets.setAmount({ value: amount, currency: "KRW" });
    await widgets.renderPaymentMethods({ selector: "#payment-method" });
    await widgets.renderAgreement({ selector: "#agreement" });

    widgetRef.current = widgets;
    orderIdRef.current = orderId;
    amountRef.current = amount;
  };

  const requestTossPayment = async () => {
    if (!widgetRef.current) {
      toast.error("결제 위젯이 초기화되지 않았습니다.");
      return;
    }

    await widgetRef.current.requestPayment({
      orderId: orderIdRef.current,
      orderName: "캐시 충전",
      successUrl: `${window.location.origin}/mypage/charge/success`,
      failUrl: `${window.location.origin}/mypage/charge/fail`,
    });
  };

  return { renderTossPayment, requestTossPayment };
};
