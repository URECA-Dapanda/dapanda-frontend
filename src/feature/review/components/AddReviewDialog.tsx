"use client";

import { BaseBottomSheet, BottomSheetHeader } from "@components/common/bottomsheet";
import { useState } from "react";

export default function AddReviewDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <BaseBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <BottomSheetHeader title="hello"></BottomSheetHeader>
      hello
    </BaseBottomSheet>
  );
}
