"use client";

import { Timer } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useRouter } from "next/navigation";
import BaseModal from "@components/common/modal/BaseModal";
import ModalHeader from "@components/common/modal/ModalHeader";
import { ButtonComponent } from "@components/common/button";

interface ReportCompleteModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ReportCompleteModal({ isOpen, setIsOpen }: ReportCompleteModalProps) {
  const router = useRouter();
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleClick = useCallback(() => {
    setIsOpen(false);
    router.replace("/data");
  }, [router]);

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader title="신고 완료" onClose={handleClose} />
      <div className="flex flex-col justify-center items-center gap-20 mb-20">
        <div className="flex items-center justify-center bg-primary text-white w-60 h-60 rounded-full">
          <Timer className="bg-primary text-white" />
        </div>
        <p className="title-sm">신고가 접수되었어요!</p>
        <p className="body-sm text-gray-600 text-center">
          신고해 주셔서 감사합니다.
          <br />
          접수된 내용은 검토 후 조치될 예정입니다.
          <br />
          보다 안전한 거래 환경을 위해 노력하겠습니다.
        </p>
      </div>
      <ButtonComponent variant={"primary"} className="w-full" onClick={handleClick}>
        홈으로 돌아가기
      </ButtonComponent>
    </BaseModal>
  );
}
