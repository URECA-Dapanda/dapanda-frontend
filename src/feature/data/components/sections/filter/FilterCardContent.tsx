import { Button } from "@ui/button";
import { Slider } from "@ui/slider";
import { useState } from "react";

export default function FilterCardContent() {
  const [value, setValue] = useState<number[]>([1]);
  return (
    <div className="flex flex-col items-center text-center gap-16">
      <h2 className="text-2xl font-bold text-gray-900">{value[0]}GB</h2>
      <p className="text-sm text-gray-500">원하는 용량을 선택하세요</p>

      <div className="w-full px-2">
        <Slider
          min={0.1}
          max={2}
          step={0.1}
          value={value}
          onValueChange={(val) => setValue(val)}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>0.1GB</span>
          <span>2GB</span>
        </div>
      </div>

      <Button className="w-full mt-2 bg-white text-black border border-gray-300 hover:bg-gray-100">
        확인
      </Button>
    </div>
  );
}
