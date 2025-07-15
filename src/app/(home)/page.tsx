"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDropdownMenu } from "@/components/common/dropdown/UserDropdownMenu";
import { chatMenuOptions, dataSortOptions } from "@/components/common/dropdown/dropdownConfig";

export default function Home() {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");

  const handleReport = () => {
    setReportModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 gap-20">
      {/* 메뉴형 드롭다운 */}
      <UserDropdownMenu options={chatMenuOptions(handleReport)}>
        <Button variant="ghost" size="icon">
          <img src="/icons/more.svg" alt="더보기" />
        </Button>
      </UserDropdownMenu>

      {/* 선택형 드롭다운 */}
      <UserDropdownMenu options={dataSortOptions} onSelectLabel={setSelectedSort}>
        <button className="body-sm px-12 py-6 rounded-6 bg-gray-100">{selectedSort}</button>
      </UserDropdownMenu>

      {reportModalOpen && (
        <div className="mt-4 p-4 border rounded-md text-error">
          신고 모달이 열렸습니다!
          <button onClick={() => setReportModalOpen(false)} className="ml-4 underline text-sm">
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
