import { useState } from "react";
import FlatCard from "@components/common/card/FlatCard";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";
import { useDataFilterStore } from "@feature/data/stores/useDataFilterStore";

interface DefaultFilterCardProps {
  onSearch?: () => void;
}

export default function DefaultFilterCard({ onSearch }: DefaultFilterCardProps) {
  const [value, setValue] = useState<number[]>([1]);
  const setDataAmount = useDataFilterStore((state) => state.setDataAmount);

  const handleSearch = () => {
    setDataAmount(value[0]);
    onSearch?.();
  };

  return (
    <FlatCard size="xl" color="bg-transparent">
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
