"use client";

import { useRouter } from "next/navigation";
import { TimerIcon } from "lucide-react";
import BaseModal from "@/components/common/modal/BaseModal";
import ModalHeader from "@/components/common/modal/ModalHeader";

interface EndOfUseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EndOfUseModal({ open, onClose }: EndOfUseModalProps) {
  const router = useRouter();

  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <ModalHeader title="이용 완료" onClose={onClose} />

      <div className="mt-24 flex flex-col items-center">
        <div className="w-68 h-68 rounded-full bg-primary flex items-center justify-center mb-16">
          <TimerIcon className="w-32 h-32 text-white" />
        </div>

        <h2 className="text-lg font-bold mb-4">이용이 종료되었어요!</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          이용이 종료되었습니다.
          <br />
          소중한 후기를 남겨주세요!
        </p>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-12">
        <button
          onClick={() => router.push("/data")}
          className="border border-primary text-primary font-semibold rounded-lg py-12"
        >
          홈으로 돌아가기
        </button>
        <button
          onClick={() => {
            // 후기 작성 경로로 이동
            router.push("/review/write");
          }}
          className="bg-primary text-white font-semibold rounded-lg py-12"
        >
          후기 작성하기
        </button>
      </div>
    </BaseModal>
  );
}
