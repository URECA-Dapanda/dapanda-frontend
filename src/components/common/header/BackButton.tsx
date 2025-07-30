"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton() {
  const router = useRouter();
  const handleBackClick = useCallback(() => {
    router.back();
  }, []);
  return (
    <div
      className="hover:cursor-pointer rounded-full h-24 w-24 flex items-center justify-center"
      onClick={handleBackClick}
    >
      <ChevronLeft />
    </div>
  );
}
