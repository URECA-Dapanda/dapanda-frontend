"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Star, X } from "lucide-react";
import { AxiosError } from "axios";
import BaseBottomSheet from "@components/common/bottomsheet/BaseBottomSheet";
import { ButtonComponent } from "@components/common/button";
import { useReviewMutation } from "@feature/review/hooks/useReviewMutation";
import InputComponent from "@components/common/input/InputComponent";
import { ReviewResponse } from "@feature/review/types/reviewType";

interface ReviewBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: number;
}

export default function ReviewBottomSheet({ isOpen, onClose, tradeId }: ReviewBottomSheetProps) {
  const [step, setStep] = useState<"form" | "complete">("form");
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  const reviewMutation = useReviewMutation(
    () => setStep("complete"),
    (e: AxiosError<unknown>) => {
      const message = (e.response?.data as ReviewResponse)?.message;
      toast.error(message || "리뷰 등록에 실패했습니다.");
    }
  );

  const handleClose = useCallback(() => {
    onClose();
    setStep("form");
  }, [onClose]);

  const handleReviewSubmit = () => {
    reviewMutation.mutate({ tradeId, rating, comment: review });
  };

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-24 px-24 py-24">
        <div className="flex justify-between items-center">
          <span className="h3 text-black">거래 후기 남기기</span>
          <X size={24} onClick={handleClose} className="cursor-pointer text-gray-500" />
        </div>

        <p className="title-sm mb-8 text-black">거래한 물건</p>

        <div className="rounded-2xl bg-primary2 flex px-24 py-24 items-stretch gap-8 ">
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-black mb-2">와이파이</div>
            <div className="text-sm text-black">
              <div>판매자: 김데이터</div>
              <div>위치: 스타벅스 선릉역점</div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between text-right">
            <div className="title-md text-primary mb-2">8,000원</div>
            <div className="body-xs text-black">
              <div>10분당 200원</div>
              <div>
                총 이용시간 <span className="text-primary">40분</span>
              </div>
            </div>
          </div>
        </div>

        {step === "form" ? (
          <div className="flex flex-col gap-24">
            <p className="title-sm text-black">김데이터 님과의 거래는 어떠셨나요?</p>
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  aria-label={`${star}점`}
                  type="button"
                >
                  <Star
                    size={30}
                    color={star <= rating ? "#feb93f" : "#feb93f"}
                    fill={star <= rating ? "#feb93f" : "none"}
                  />
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-12 w-full">
              <p className="body-md text-black">한 줄 후기를 남겨주세요!</p>
              <InputComponent
                className="min-h-120 w-full"
                as="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="거래 후기를 간단하게 작성해 주세요(선택)"
              />
            </div>

            <ButtonComponent className="w-full" variant="primary" onClick={handleReviewSubmit}>
              리뷰 남기기
            </ButtonComponent>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-24 py-48">
            <div className="w-60 h-60 rounded-circle bg-primary flex items-center justify-center mb-12">
              <span className="text-4xl text-white">✔</span>
            </div>
            <div className="title-md text-black font-bold">리뷰 작성 완료!</div>
            <div className="body-md text-gray-500 text-center">리뷰 작성이 완료되었습니다.</div>
            <ButtonComponent className="w-full mt-20" variant="primary" onClick={handleClose}>
              홈으로 돌아가기
            </ButtonComponent>
          </div>
        )}
      </div>
    </BaseBottomSheet>
  );
}
