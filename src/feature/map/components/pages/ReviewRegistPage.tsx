"use client";

import ReviewBottomSheet from "@feature/map/components/sections/review/ReviewBottomSheet";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ReviewRegistPageContent() {
  const params = useSearchParams();
  const tradeId = Number(params.get("tradeId"));
  const [isOpen, setIsOpen] = useState(true);
  if (!tradeId || isNaN(tradeId)) {
    return <div>잘못된 접근입니다. tradeId가 없습니다.</div>;
  }

  return <ReviewBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} tradeId={tradeId} />;
}
