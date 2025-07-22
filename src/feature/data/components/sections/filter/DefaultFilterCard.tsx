import { useState } from "react";
import FlatCard from "@components/common/card/FlatCard";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";

export default function DefaultFilterCard() {
  const [value, setValue] = useState<number[]>([1]);

  const handleSearch = () => {
    // 일반 구매에서 이 value로 데이터 필터링 수행
    console.log("일반 구매 검색:", value[0]);
    // ex) setFilterValue(value[0]); queryClient.invalidate...
  };

  return (
    <FlatCard size="xl">
      <FilterCardContent
        buttonText="검색하기"
        value={value}
        onValueChange={setValue}
        onButtonClick={handleSearch}
        max={2}
      />
    </FlatCard>
  );
}
