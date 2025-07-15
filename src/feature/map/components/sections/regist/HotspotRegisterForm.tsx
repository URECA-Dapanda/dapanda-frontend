"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import InputComponent from "@components/common/input/InputComponent";
import { ButtonComponent } from "@components/common/button";
import { badgeVariants } from "@components/common/badge/badgeVariants";

export default function HotspotRegistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleSubmit = () => {
    console.log({ title, description, price, startTime });
    // 등록 처리 로직
  };

  return (
    <div className="mx-auto py-6">
      <div className="title-md mb-16">핫스팟 판매</div>

      {/* 제목 */}
      <label className="title-sm mb-12 block">제목</label>
      <InputComponent
        placeholder="예: 강남역 2번 출구 앞"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-12 px-3"
        radius="md"
        size="md"
        color=""
        disabled={false}
        required
      />

      {/* 설명 */}
      <label className="title-sm mb-12 block">설명</label>
      <InputComponent
        as="textarea"
        placeholder="위치 설명, 이용 조건 등을 입력해주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-12"
        radius="md"
        size="md"
        disabled={false}
        required
        rows={3}
      />

        {/* 가격 */}
        <div className="flex items-center mb-12 gap-8">
            <label className="title-sm block">가격 (15분)</label>
            <div className="flex gap-8">
                <span className={badgeVariants({ variant: "outlined", size: "md" })}>
                    최근 거래가: 2000원
                </span>
                <span className={badgeVariants({ variant: "outlined", size: "md" })}>
                    평균 거래가: 2000원
                </span>
            </div>
        </div>

      <InputComponent
        placeholder="예: 300"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-12 px-3"
        radius="md"
        size="md"
        color=""
        type="number"
        disabled={false}
      />

      {/* 이용 시작 시간 */}
      <label className="title-sm mb-12 block">이용 시작 시간</label>
      <InputComponent
        placeholder="예: 09:00"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="w-full mb-12 px-3"
        radius="md"
        size="md"
        color=""
        disabled={false}
      />

      {/* 사진 첨부 */}
      <label className="title-sm mb-12 block">사진 첨부</label>
      <div className="flex gap-12 mb-24">
        <div className="w-80 h-80 border border-dashed border-primary rounded-20 flex items-center justify-center text-pink-500 text-2xl">
          <Camera className="w-32 h-32"/>
        </div>
        <div className="w-80 h-80 bg-primary-50 rounded-20" />
        <div className="w-80 h-80 bg-primary-50 rounded-20" />
      </div>

      {/* 등록하기 버튼 */}
      <ButtonComponent
        className="w-full"
        variant="secondary"
        size="4xl"
        onClick={handleSubmit}
      >
        등록하기
      </ButtonComponent>
    </div>
  );
}
