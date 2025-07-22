"use client";

import { useTossSuccessModalStore } from "@feature/mypage/stores/useTossSuccessModalStore";
import { ButtonComponent } from "@components/common/button";
import { CheckCircle2 } from "lucide-react";

export default function TossSuccessModal() {
  const { isOpen, close } = useTossSuccessModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-60 z-70 flex items-center justify-center">
      <div className="bg-white w-[327px] h-[300px] rounded-20 p-6 text-center shadow-lg flex flex-col justify-center items-center gap-40">
        <CheckCircle2 size={64} className="text-green-500" />
        <h2 className="body-lg">
          캐시가 <span className="text-primary">충전</span>되었습니다
        </h2>
        <ButtonComponent variant="primary" className="w-[280px]" onClick={close}>
          완료
        </ButtonComponent>
      </div>
    </div>
  );
}
