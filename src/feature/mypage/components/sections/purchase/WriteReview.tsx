"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";

interface WriteReviewProps {
  tradeId?: number;
}

function WriteReview({ tradeId }: WriteReviewProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/map/review/register?tradeId=${tradeId}`)}
      className="text-primary border-primary border-1 body-xs rounded-lg py-4 w-full px-12 self-start mt-8"
    >
      후기 작성하기
    </button>
  );
}

export default memo(WriteReview);
