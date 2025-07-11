"use client";

import { useState } from "react";
import BaseModal from "@/components/common/modal/BaseModal";
import ModalHeader from "@/components/common/modal/ModalHeader";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-color-primary-700 text-white rounded-xl font-semibold hover:bg-color-primary-600"
      >
        모달 열기
      </button>

      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader title="테스트 모달" onClose={() => setIsOpen(false)} />
        <div className="text-sm text-gray-700 space-y-3">
          <p>이건 테스트용 모달입니다.</p>
          <p>Tailwind 디자인 시스템이 잘 적용되었는지 확인해보세요.</p>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </BaseModal>
    </div>
  );
}
