"use client";

import { ButtonComponent } from "@components/common/button";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface WriteReviewProps {
  tradeId?: number;
}

function WriteReview({ tradeId }: WriteReviewProps) {
  const router = useRouter();

  return (
    <ButtonComponent
      onClick={() => router.push(`/review?tradeId=${tradeId}`)}
      variant={"outlinePrimary"}
      size={"xxs"}
      className="px-12"
      // className="text-primary border-primary border-1 body-xs rounded-lg py-4 w-fit px-12 self-start"
    >
      리뷰 쓰기
    </ButtonComponent>
  );
}

export default memo(WriteReview);
