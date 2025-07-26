"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Check, Star, X } from "lucide-react";
import { AxiosError } from "axios";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import { ButtonComponent } from "@components/common/button";
import { useReviewMutation } from "@/feature/map/hooks/useReviewMutation";
import InputComponent from "@components/common/input/InputComponent";
import { ReviewResponse } from "@/feature/map/types/reviewType";
import { useRouter } from "next/navigation";

export interface ReviewBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: number;
  hideHeader?: boolean;
}

export default function ReviewBottomSheet({ isOpen, onClose, tradeId }: ReviewBottomSheetProps) {
  const [step, setStep] = useState<"form" | "complete">("form");
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const router = useRouter();

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
    <BaseBottomSheet isOpen={isOpen} onClose={handleClose} variant="hybrid" snapHeight={320}>
      <div className="flex flex-col gap-8 px-24 py-24">
        <div className="flex justify-between items-center">
          <span className="h3 text-black">거래 후기 남기기</span>
          <X size={24} onClick={handleClose} className="cursor-pointer text-gray-500" />
        </div>

        <div className="flex flex-col gap-24"></div>
        {step === "form" ? (
          <div className="flex flex-col gap-24">
            <p className="title-sm text-black">거래는 어떠셨나요?</p>
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
                className="min-h-144 w-full"
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
          <div className="mt-52 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-32">
              <div className="rounded-full w-60 h-60 bg-success flex justify-center items-center">
                <Check className="bg-success" size={30} color="white" />
              </div>
              <div className="title-sm text-black font-bold">리뷰 작성 완료!</div>
              <div className="body-sm text-gray-600 text-center">리뷰 작성이 완료되었습니다.</div>
              <ButtonComponent
                className="w-full mt-52"
                variant="primary"
                onClick={() => router.push("/data")}
              >
                홈으로 돌아가기
              </ButtonComponent>
            </div>
          </div>
        )}
      </div>
    </BaseBottomSheet>
  );
}
