"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { ButtonComponent } from "@components/common/button";

interface WriteReviewProps {
  tradeId?: number;
  disabled?: boolean;
}

function WriteReview({ tradeId, disabled }: WriteReviewProps) {
  const router = useRouter();

  return (
    <ButtonComponent
      onClick={() => router.push(`/review?tradeId=${tradeId}`)}
      variant={disabled ? "outlineGray" : "outlinePrimary"}
      size={"xxs"}
      className="px-12"
      disabled={disabled}
    >
      리뷰 쓰기
    </ButtonComponent>
  );
}

export default memo(WriteReview);
