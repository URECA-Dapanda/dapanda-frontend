"use client";

import BaseModal from "@/components/common/modal/BaseModal";
import ModalHeader from "@/components/common/modal/ModalHeader";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";
import { formatIsoToHHMM } from "@lib/time";
import FullScreenModal from "@components/common/modal/FullScreenModal";

interface PaymentConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  type: "data" | "wifi" | "hotspot";
  info: {
    title: string;
    price: string;
    buyerType?: "일반 구매" | "분할 구매" | "자투리 구매"; // 데이터만 해당
    seller?: string;
    location?: string; // 와이파이/핫스팟
    startTime?: string; // 와이파이/핫스팟
    endTime?: string;
  };
}

const PaymentConfirmModal = ({ isOpen, onClose, onNext, type, info }: PaymentConfirmModalProps) => {
  return (
    <FullScreenModal isOpen={isOpen}>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <ModalHeader title="결제 확인" onClose={onClose} />

        <div className="flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full bg-warning mb-24 flex items-center justify-center text-white text-xl">
            !
          </div>
          <p className="title-sm mb-16">결제 전, 다시 한 번 확인해주세요!</p>

          <div className="text-gray-600 body-sm space-y-4 mb-32 text-left">
            <p>📦 구매 물품: {info.title}</p>
            {type === "data" && info.buyerType && <p>💳 구매 방식: {info.buyerType}</p>}
            {info.seller && <p>👤 판매자: {info.seller}</p>}
            {info.location && <p>📍 위치: {info.location}</p>}
            {info.startTime && info.endTime && (
              <p>
                ⏱️ 이용 시간: {formatIsoToHHMM(info.startTime)} ~ {formatIsoToHHMM(info.endTime)}
              </p>
            )}
            <p>💰 결제 가격: {info.price}</p>
          </div>

          <ButtonComponent className="w-[278px]" onClick={onNext}>
            결제 계속하기
          </ButtonComponent>
        </div>
      </BaseModal>
    </FullScreenModal>
  );
};

export default PaymentConfirmModal;
