// src/app/test/ReviewBottomSheetTrigger.tsx
"use client";

import ReviewBottomSheet from "@feature/review/components/ReviewBottomSheet";
import { useState } from "react";

export default function ReviewBottomSheetTrigger() {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-8">
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setOpen(true)}>
        리뷰 바텀시트 열기
      </button>
      <ReviewBottomSheet isOpen={open} onClose={() => setOpen(false)} tradeId={1} />
    </div>
  );
}
