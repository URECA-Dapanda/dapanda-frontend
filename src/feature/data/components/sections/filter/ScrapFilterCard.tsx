import FlatCard from "@components/common/card/FlatCard";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";

interface ScrapFilterCardProps {
  value: number[];
  setValue: (value: number[]) => void;
  onSearch: () => void;
}

export default function ScrapFilterCard({ value, setValue, onSearch }: ScrapFilterCardProps) {
  return (
    <FlatCard size="xl">
      <FilterCardContent
        buttonText="검색하기"
        value={value}
        onValueChange={setValue}
        onButtonClick={onSearch}
      />
    </FlatCard>
  );
}
