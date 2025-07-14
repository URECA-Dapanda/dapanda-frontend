"use client";

import { useState } from "react";
import { User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDropdownMenu } from "@/components/common/UserDropdownMenu";

export default function Home() {
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const handleReport = () => {
    setReportModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* 드롭다운 버튼 */}
      <UserDropdownMenu
        options={[
          {
            label: "프로필 보기",
            icon: <User className="w-4 h-4 text-color-gray-600" />,
            action: { type: "link", href: "/profile/user1" },
          },
          {
            label: "신고하기",
            icon: <AlertTriangle className="w-4 h-4 text-color-gray-600" />,
            action: { type: "action", onClick: handleReport },
          },
        ]}
      >
        <Button variant="ghost" size="icon">
          <img src="/icons/more.svg" alt="더보기" />
        </Button>
      </UserDropdownMenu>

      {/* 테스트용 모달 표시 */}
      {reportModalOpen && (
        <div className="mt-4 p-4 border rounded-md text-red-600">
          신고 모달이 열렸습니다!
          <button onClick={() => setReportModalOpen(false)} className="ml-4 underline text-sm">
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
