import { Button } from "@ui/button";
import Slider from "@components/common/slider/SliderComponent";
import { formatDataSize } from "@lib/formatters";
import { useState } from "react";

export default function FilterCardContent() {
  const [value, setValue] = useState<number[]>([1]);
  return (
    <div className="flex flex-col items-center text-center gap-12">
      <h2 className="h1 text-black">{formatDataSize(value[0])}</h2>
      <p className="body-sm text-gray-600">원하는 용량을 선택하세요</p>

      <Slider
        value={value}
        onValueChange={setValue}
        max={5}
      />

      <Button className="w-[280px] bg-white title-xs text-black rounded-6 hover:bg-gray-100">
        확정
      </Button>
    </div>
  );
}
