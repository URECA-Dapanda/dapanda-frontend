import FlatCard from "@components/common/card/FlatCard";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";

interface ScrapFilterCardProps {
  value: number[];
  setValue: (value: number[]) => void;
  onSearch: () => void;
}

export default function ScrapFilterCard({ value, setValue, onSearch }: ScrapFilterCardProps) {
  return (
    <FlatCard size="md">
      <FilterCardContent
        buttonText="검색하기"
        value={value}
        onValueChange={setValue}
        onButtonClick={onSearch}
        max={2}
        gap={0}
      />
    </FlatCard>
  );
}
