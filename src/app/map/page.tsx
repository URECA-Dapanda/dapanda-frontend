"use client";
import { useState } from "react";
import InputComponent from "@/components/common/input/InputComponent";

export default function MapPage() {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("123");

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold">InputComponent 테스트</h1>

      {/* 텍스트 인풋 - lg */}
      <InputComponent
        radius="lg"
        size="lg"
        placeholder="텍스트 입력 인풋 필드 (lg)"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        type="text"
        disabled={false}
        required
      />

      {/* 숫자 인풋 - md */}
      <InputComponent
        radius="md"
        size="md"
        placeholder="숫자 입력 인풋 필드 (md)"
        value={numberValue}
        onChange={(e) => setNumberValue(e.target.value)}
        className="w-full"
        type="number"
        disabled={false}
      />

      {/* 작은 인풋 - md */}
      <InputComponent
        radius="sm"
        size="md"
        placeholder="작은 인풋"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        disabled={false}
      />

      {/* disabled 테스트 */}
      <InputComponent
        radius="md"
        size="md"
        value="비활성화됨"
        onChange={() => {}}
        disabled
      />
    </div>
  );
} 