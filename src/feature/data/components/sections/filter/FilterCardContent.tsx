import { ButtonComponent } from "@/components/common/button";
import Slider from "@components/common/slider/SliderComponent";
import { formatDataSize } from "@lib/formatters";

interface FilterCardContentProps {
  buttonText: string;
  onButtonClick?: (selectedAmount: number) => void;
  value: number[];
  max: number;
  onValueChange: (val: number[]) => void;
  disabled?: boolean;
}

export default function FilterCardContent({
  buttonText,
  onButtonClick,
  value,
  max,
  onValueChange,
  disabled,
}: FilterCardContentProps) {
  return (
    <div className="flex flex-col items-center text-center gap-12">
      <h2 className="h1 text-black">{formatDataSize(value[0])}</h2>
      <p className="body-sm text-gray-600">원하는 용량을 선택하세요</p>

      <Slider value={value} onValueChange={onValueChange} max={max} />

      <ButtonComponent
        variant="nonoutline"
        className="w-[280px]"
        onClick={() => {
          if (!disabled) {
            onButtonClick?.(value[0]);
          }
        }}
        disabled={disabled}
      >
        {buttonText}
      </ButtonComponent>
    </div>
  );
}
