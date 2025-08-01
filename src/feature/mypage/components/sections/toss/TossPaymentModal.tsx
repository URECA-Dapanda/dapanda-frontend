"use client";

import { useEffect, useRef } from "react";
import { useTossModalStore } from "@feature/mypage/stores/useTossModalStore";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";
import { useTossPayment } from "@feature/mypage/hooks/useTossPayment";
import { ButtonComponent } from "@components/common/button";

export default function TossPaymentModal() {
  const { isOpen, close } = useTossModalStore();
  const charge = useChargeStore((state) => state.charge);
  const { renderTossPayment, requestTossPayment } = useTossPayment();
  const rendered = useRef(false);

  useEffect(() => {
    if (isOpen && !rendered.current && charge) {
      rendered.current = true;
      renderTossPayment(charge);
      console.log("호출됨: renderTossPayment with charge =", charge);
    }
  }, [isOpen, charge]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-60 w-[600px] h-[100dvh] mx-auto z-60 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-[600px] max-w-full">
        <h2 className="title-md mb-4">결제하기</h2>

        {/* Toss 위젯 위치 */}
        <div id="payment-method" className="mb-6" />
        <div id="agreement" className="mb-6" />

        {/* 결제 버튼 추가 */}
        <ButtonComponent variant={"primary"} onClick={requestTossPayment} className="w-full mt-4">
          결제 진행하기
        </ButtonComponent>

        <ButtonComponent
          variant={"text"}
          onClick={close}
          className="mt-4 text-sm text-gray-500 hover:underline block mx-auto"
        >
          닫기
        </ButtonComponent>
      </div>
    </div>
  );
}
