"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

function RechargeCashButton() {
  const router = useRouter();

  const handleChargeButtonClick = useCallback(() => {
    router.push("/checkout");
  }, []);

  return (
    <Button
      variant="secondary"
      size="sm"
      className="w-full bg-[#ffd964] hover:bg-[#ffe8c6] text-black border-0"
      onClick={handleChargeButtonClick}
    >
      캐시 충전하기
    </Button>
  );
}

export default memo(RechargeCashButton);
