"use client";
import { useState } from "react";
import InputComponent from "@/components/common/input/InputComponent";
import { BottomSheetHeader, BaseBottomSheet } from "@components/common/bottomsheet";
// import HotspotRegistForm from "@/feature/map/components/sections/regist/HotspotRegisterForm";
export default function MapDetail() {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("123");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnapOpen, setIsSnapOpen] = useState(false);

  return (
    <div className="px-24 space-y-24 min-h-screen">
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
      <InputComponent radius="md" size="md" value="비활성화됨" onChange={() => {}} disabled />

      {/* 핫스팟 등록 폼 */}
      {/* <div className="mt-16">
        <HotspotRegistForm />
      </div> */}

      {/* 모달형 바텀시트 */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        모달 바텀시트 열기
      </button>
      <BaseBottomSheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} variant="modal">
        <BottomSheetHeader title="모달 바텀시트" />
        <p>모달 바텀시트의 내용입니다.</p>
      </BaseBottomSheet>

      {/* 스냅형 바텀시트 */}
      <BaseBottomSheet
        isOpen={isSnapOpen}
        onClose={() => setIsSnapOpen(false)}
        variant="snap"
        snapHeight={300}
      >
        <BottomSheetHeader title="데이터 목록" />
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
        <div className="p-4">...</div>
      </BaseBottomSheet>
    </div>
  );
}
