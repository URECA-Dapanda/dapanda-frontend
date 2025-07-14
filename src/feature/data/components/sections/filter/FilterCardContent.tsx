import { Button } from "@ui/button";
import Slider from "@/components/common/Slider";
import { useState } from "react";

export default function FilterCardContent() {
  const [value, setValue] = useState<number[]>([1]);
  return (
    <div className="flex flex-col items-center text-center gap-16">
      <h2 className="text-2xl font-bold text-gray-900">{value[0]}GB</h2>
      <p className="body-sm text-gray-500">원하는 용량을 선택하세요</p>

      <Slider
        value={value}
        onValueChange={setValue}
        max={10}
      />

      <Button className="w-full mt-2 bg-white text-black border border-gray-300 hover:bg-gray-100">
        확인
      </Button>
    </div>
  );
}
