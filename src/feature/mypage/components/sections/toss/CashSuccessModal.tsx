"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ButtonComponent } from "@components/common/button";
import { CheckCircle2 } from "lucide-react";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";

interface CashSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "charge" | "refund";
}

export default function CashSuccessModal({ isOpen, onClose, mode }: CashSuccessModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setCharge = useChargeStore((state) => state.setCharge);

  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["/api/members/cash"] });
    setCharge("");
    onClose();
    router.replace("/mypage");
  };

  if (!isOpen) return null;

  const actionText = mode === "charge" ? "충전" : "환불";

  return (
    <div className="fixed inset-0 bg-black-60 z-105 flex items-center justify-center">
      <div className="bg-white w-[327px] h-[300px] rounded-20 p-6 text-center shadow-lg flex flex-col justify-center items-center gap-40">
        <CheckCircle2 size={64} className="text-green-500" />
        <h2 className="body-lg">
          캐시가 <span className="text-primary">{actionText}</span>되었습니다
        </h2>
        <ButtonComponent variant="primary" className="w-[280px]" onClick={handleClose}>
          완료
        </ButtonComponent>
      </div>
    </div>
  );
}
