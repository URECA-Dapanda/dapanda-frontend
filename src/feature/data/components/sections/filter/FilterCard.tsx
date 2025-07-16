import FlatCard from "@components/common/card/FlatCard";
import FilterCardContent from "./FilterCardContent";

export default function FilterCard() {
  return (
    <FlatCard size="xl">
      <FilterCardContent 
        buttonText="검색하기"
        onButtonClick={()=>{
          console.log("검색실행");
        }}/>
    </FlatCard>
  );
}
