"use client";

import BaseModal from "@/components/common/modal/BaseModal";
import ModalHeader from "@/components/common/modal/ModalHeader";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";

interface PaymentCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "data" | "wifi" | "hotspot";
  info: {
    title: string;
    remainingData?: string;
  };
}

const PaymentCompleteModal = ({
  isOpen,
  onClose,
  type,
  info,
}: PaymentCompleteModalProps) => {
  const getMessage = () => {
    if (type === "data") {
      return (
        <>
          <p className="title-sm mb-8">{info.title} 데이터 구매 완료!</p>
          <p className="text-gray-600 body-sm mb-32">
            내 데이터 잔량:{" "}
            <span className="font-bold text-black">{info.remainingData}</span>
          </p>
        </>
      );
    }

    return (
      <>
        <p className="title-sm mb-8">
          {type === "wifi" ? "와이파이" : "핫스팟"} 구매 완료!
        </p>
        <p className="text-gray-600 body-sm mb-32">
          {info.title} 상품이 성공적으로 구매되었습니다.
        </p>
      </>
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="결제 완료" onClose={onClose} />
      <div className="flex flex-col items-center text-center">
        <div className="w-48 h-48 rounded-full bg-green-500 mb-24 flex items-center justify-center text-white text-xl">
          ✓
        </div>
        {getMessage()}
        <ButtonComponent className="w-[278px]" onClick={onClose}>홈으로 돌아가기</ButtonComponent>
      </div>
    </BaseModal>
  );
};

export default PaymentCompleteModal;
