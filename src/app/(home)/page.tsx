"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { chatMenuOptions, dataSortOptions } from "@components/common/dropdown/dropdownConfig";

export default function Home() {
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const handleReport = () => {
    setReportModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* 드롭다운 버튼 */}
      <UserDropdownMenu options={chatMenuOptions(handleReport)}>
        <Button variant="ghost" size="icon">
          <img src="/icons/more.svg" alt="더보기" />
        </Button>
      </UserDropdownMenu>

      <div className="min-h-screen flex items-center justify-center bg-white">
        <UserDropdownMenu options={dataSortOptions}>
          <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">정렬</button>
        </UserDropdownMenu>
      </div>

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
