"use client";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { savePaymentAmount } from "@feature/mypage/apis/payment";
import { v4 as uuidv4 } from "uuid";

export const useTossPayment = () => {
  const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
  const customerKey = "ANONYMOUS";

  const widgetRef = { current: null as any };
  const orderIdRef = { current: "" };
  const amountRef = { current: 0 };

  // 토스 페이먼츠 위젯 렌더링
  const renderTossPayment = async (chargeStr: string) => {
    const amount = Number(chargeStr);
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("유효한 결제 금액을 입력해주세요.");
      return;
    }
  
    console.log("renderTossPayment 시작됨");
  
    const orderId = `order-${uuidv4()}`;
    const widget = await loadPaymentWidget(clientKey, customerKey);
  
    console.log("savePaymentAmount 요청 전:", orderId, amount);
  
    try {
      await savePaymentAmount(orderId, amount);
      console.log("savePaymentAmount 성공");
    } catch (e) {
      console.error("savePaymentAmount 실패", e);
    }
  
    await widget.renderPaymentMethods("#payment-method", {
      value: amount,
      currency: "KRW",
    });
  
    await widget.renderAgreement("#agreement");
  
    widgetRef.current = widget;
    orderIdRef.current = orderId;
    amountRef.current = amount;
  };
  

  // 결제 실행
  const requestTossPayment = async () => {
    if (!widgetRef.current) {
      alert("결제 위젯이 초기화되지 않았습니다.");
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
