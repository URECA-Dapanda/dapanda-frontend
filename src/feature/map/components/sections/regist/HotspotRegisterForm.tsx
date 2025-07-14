"use client";

import { useState } from "react";
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
        className="w-full mb-16 border border-gray-300 px-3"
        radius="md"
        size="md"
        color=""
        disabled={false}
        required
      />

      {/* 설명 */}
      <label className="title-sm mb-12 block">설명</label>
      <textarea
        className="w-full h-24 rounded-10 border border-gray-300 px-3 py-2 resize-none text-sm mb-16"
        placeholder="위치 설명, 이용 조건 등을 입력해주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        className="w-full mb-16 border border-gray-300 px-3"
        radius="md"
        size="md"
        color=""
        type="number"
        disabled={false}
      />

      {/* 이용 시작 시간 */}
      <label className="title-sm font-medium mb-12 block">이용 시작 시간</label>
      <InputComponent
        placeholder="예: 09:00"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="w-full mb-16 border border-gray-300 px-3"
        radius="md"
        size="md"
        color=""
        disabled={false}
      />

      {/* 사진 첨부 */}
      <label className="title-sm mb-12 block">사진 첨부</label>
      <div className="flex gap-12 mb-24">
        <div className="w-[80px] h-[80px] border border-dashed border-primary rounded-20 flex items-center justify-center text-pink-500 text-2xl">
          아이콘
        </div>
        <div className="w-[80px] h-[80px] bg-primary-50 rounded-20" />
        <div className="w-[80px] h-[80px] bg-primary-50 rounded-20" />
      </div>

      {/* 등록하기 버튼 */}
      <ButtonComponent
        className="w-full"
        variant="primary"
        size="4xl"
        color="bg-primary text-white"
        onClick={handleSubmit}
      >
        등록하기
      </ButtonComponent>
    </div>
  );
}
