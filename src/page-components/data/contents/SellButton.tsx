"use client";
import { Button } from "@/components/ui/button";
import { useSaleStore } from "@/stores/useSaleStore";
import { Plus } from "lucide-react";

export default function SellButton() {
  const handleShowSellSheet = useSaleStore(
    (state) => state.handleShowSellSheet
  );

  return (
    <div className="flex justify-end mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShowSellSheet}
        className="flex items-center gap-1 border-[#ffd964] text-[#119c72] hover:bg-[#fefaef] bg-transparent"
      >
        <Plus className="w-4 h-4" />
        데이터 판매하기
      </Button>
    </div>
  );
}
