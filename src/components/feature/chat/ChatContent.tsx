"use client";

import { ButtonComponent } from "@/components/common/button";

export default function ChatContent() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-lg">버튼 테스트</h2>

      <div className="flex gap-4 flex-wrap">
        <ButtonComponent variant="main" size="md" className="bg-bg-primary text-white">
          리뷰남기기 test
        </ButtonComponent>
        <div className="flex gap-2">
          <ButtonComponent variant="modalPrimary" size="md" className="bg-bg-primary text-white">
            신고하기
          </ButtonComponent>

          <ButtonComponent
            variant="modalSecondary"
            size="md"
            className="border border-bg-primary text-bg-primary hover:bg-white"
          >
            취소하기
          </ButtonComponent>
        </div>
      </div>

      <div className="mt-10">
        <p>채팅 내용이 여기에 들어갑니다...</p>
      </div>
    </div>
  );
}
