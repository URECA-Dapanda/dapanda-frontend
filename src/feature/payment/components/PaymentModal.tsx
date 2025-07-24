"use client";

import { useState } from "react";
import BaseModal from "@/components/common/modal/BaseModal";
import ModalHeader from "@/components/common/modal/ModalHeader";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";
import { BadgeComponent } from "@/components/common/badge/BadgeComponent";
import { Wallet } from "lucide-react";
import CurrentCashCard from "@feature/mypage/components/sections/profile/CurrentCashCard";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  type: "data" | "wifi" | "hotspot";
  info: {
    title: string;
    price: string;
    unitPrice?: string;
    seller?: string;
    badge?: "일반 구매" | "분할 구매" | "자투리 구매";
    location?: string;
    duration?: string;
  };
}

const PaymentModal = ({
  isOpen,
  onClose,
  onPay,
  type,
  info,
}: PaymentModalProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="결제하기" onClose={onClose} />

      <div className="space-y-16">
        {/* 뱃지 (데이터 상품만) */}
        {type === "data" && info.badge && (
          <BadgeComponent variant="label" size="sm" className="mb-8">
            {info.badge}
          </BadgeComponent>
        )}

        {/* 상품 정보 카드 */}
        <div className="p-16 bg-gray-100 rounded-12 space-y-2 text-left">
          <p className="title-sm">
            {info.title} <span className="text-primary">({info.price})</span>
          </p>
          {info.unitPrice && (
            <p className="text-xs text-gray-500">100MB당 가격: {info.unitPrice}</p>
          )}
          {info.seller && (
            <p className="text-xs text-gray-500">판매자: {info.seller}</p>
          )}
          {info.location && (
            <p className="text-xs text-gray-500">위치: {info.location}</p>
          )}
          {info.duration && (
            <p className="text-xs text-gray-500">이용시간: {info.duration}</p>
          )}
        </div>

        {/* 결제 수단 선택 */}
        <div className="space-y-8">
          <p className="title-xs">결제 수단</p>
          <label className="flex items-center gap-12 mb-24">
            <input
              type="radio"
              checked={selected}
              onChange={() => setSelected(true)}
            />
            <Wallet className="w-20" />
            <span>캐시로 결제하기</span>
          </label>

          {/* 보유 캐시 카드 */}
          <CurrentCashCard />
        </div>

        {/* 결제 버튼 */}
        <ButtonComponent
          disabled={!selected}
          onClick={onPay}
          className="w-full"
        >
          {selected ? `${info.price} 결제하기` : `결제 수단을 선택해주세요`}
        </ButtonComponent>
      </div>
    </BaseModal>
  );
};

export default PaymentModal;
