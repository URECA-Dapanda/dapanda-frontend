import { Slider as BaseSlider } from "@ui/slider";

interface SliderProps {
  value: number[];
  onValueChange: (val: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

function formatLabel(val: number) {
  return val < 1 ? `${Math.round(val * 1000)}MB` : `${val}GB`;
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
      <div className="flex justify-between body-sm text-gray-500 mt-1">
        <span>{formatLabel(min)}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </div>
  );
}
