import { Slider as BaseSlider } from "@ui/slider";
import { formatDataSize } from "@lib/formatters";

interface SliderProps {
  value: number[];
  onValueChange: (val: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function Slider({
  value,
  onValueChange,
  min = 0.1,
  max = 2,
  step = 0.1,
  className = "",
}: SliderProps) {
  return (
    <div className={`w-full px-8 ${className}`}>
      <BaseSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        className="w-full"
      />
      <div className="flex justify-between body-xs text-gray-600 mt-1">
        <span>{formatDataSize(min)}</span>
        <span>{formatDataSize(max)}</span>
      </div>
    </div>
  );
}
