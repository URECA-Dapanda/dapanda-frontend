"use client";

import { Button } from "@/components/ui/button";

export default function ChatContent() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-lg">버튼 테스트</h2>

      <div className="flex gap-4 flex-wrap">
        <Button>기본 버튼1</Button>
        <Button variant="secondary">기본 버튼2</Button>
        <Button disabled>비활성</Button>
        <Button size="pill">Pill 버튼</Button>
        <Button size="small">짧</Button>
        <Button size="modalFull">모달 Full</Button>

        <Button size="half">모달1</Button>
        <Button size="half" variant="halfOutline">
          모달2
        </Button>
        <Button size="medium">중간 사이즈 버튼</Button>
      </div>

      <div className="mt-10">
        <p>채팅 내용이 여기에 들어갑니다...</p>
      </div>
    </div>
  );
}
