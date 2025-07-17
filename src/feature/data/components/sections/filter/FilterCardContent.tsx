import { useState } from "react";
import { ButtonComponent } from "@/components/common/button";
import Slider from "@components/common/slider/SliderComponent";
import { formatDataSize } from "@lib/formatters";

interface FilterCardContentProps {
  buttonText: string;
  onButtonClick?: ()=> void;
}

export default function FilterCardContent({
  buttonText,
  onButtonClick,
}: FilterCardContentProps) {
  const [value, setValue] = useState<number[]>([1]);
  return (
    <div className="flex flex-col items-center text-center gap-12">
      <h2 className="h1 text-black">{formatDataSize(value[0])}</h2>
      <p className="body-sm text-gray-600">원하는 용량을 선택하세요</p>

      <Slider
        value={value}
        onValueChange={setValue}
        max={2}
      />

      <ButtonComponent 
        variant="nonoutline" 
        className="w-[280px]"
        onClick={onButtonClick}
      >
        {buttonText}
      </ButtonComponent>
    </div>
  );
}
