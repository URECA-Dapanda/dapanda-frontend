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
  gap?: number;
}

export default function FilterCardContent({
  buttonText,
  onButtonClick,
  value,
  max,
  onValueChange,
  gap = 12,
  disabled,
}: FilterCardContentProps) {
  return (
    <div
      className="flex flex-col h-full justify-center items-center text-center p-12"
      style={{ gap: gap }}
    >
      <h2 className="h1 text-black">{formatDataSize(value[0])}</h2>
      <p className="body-sm text-gray-600">원하는 용량을 선택하세요</p>

      <Slider value={value} onValueChange={onValueChange} max={max} disabled={disabled} />

      <ButtonComponent
        variant="nonoutline"
        className="w-[280px]"
        onClick={() => {
          if (!disabled && value[0] >= 0.1) {
            onButtonClick?.(value[0]);
          }
        }}
        disabled={disabled || value[0] < 0.1}
      >
        {buttonText}
      </ButtonComponent>
    </div>
  );
}
