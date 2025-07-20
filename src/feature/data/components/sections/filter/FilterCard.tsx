import FlatCard from "@components/common/card/FlatCard";
import FilterCardContent from "./FilterCardContent";

export default function FilterCard() {
  return (
    <FlatCard size="xl">
      <FilterCardContent
        buttonText="검색하기"
        max={2} // 실제 연동할 때에는 max={data.remainAmount} 처럼 기준값을 넣을 예정
        onButtonClick={() => {
          console.log("검색실행");
        }}
      />
    </FlatCard>
  );
}
