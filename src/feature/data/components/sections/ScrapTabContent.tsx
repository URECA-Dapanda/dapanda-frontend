"use client";

import { useState } from "react";
import FilterCard from "./filter/FilterCard";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { ButtonComponent } from "@/components/common/button";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { ChevronDown, Search } from "lucide-react";

export default function ScrapTabContent() {
  const [sortLabel, setSortLabel] = useState("최신순");

  return (
    <div className="px-24 space-y-24">
      {/* 정렬 드롭다운 */}
      <div className="flex justify-end items-center gap-8 mb-12">
        <UserDropdownMenu
          options={dataSortOptions}
          selectedLabel={sortLabel}
          onSelectLabel={setSortLabel}
        >
          <ButtonComponent variant="withIcon" size="sm" className="p-6 body-xs">
            {sortLabel}
            <ChevronDown className="w-20 h-20" />
          </ButtonComponent>
        </UserDropdownMenu>
      </div>

      {/* 슬라이더 및 문구 */}
      <FilterCard />

      <div className="flex flex-col items-center justify-center text-center mt-32">
        <Search className="w-64 h-64 mb-16" />
        <p className="text-lg font-medium">가장 저렴한 자투리 조합을 찾아드릴게요!</p>
      </div>
    </div>
  );
}
