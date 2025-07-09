"use client";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Slider } from "@ui/slider";
import { useState } from "react";

export default function PurchaseSection() {
  const [purchaseMode, setPurchaseMode] = useState("daily");
  const [fragmentAmount, setFragmentAmount] = useState([0.5]);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex bg-[#ffe8c6] rounded-full p-1 my-4">
        <button
          onClick={() => setPurchaseMode("daily")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
            purchaseMode === "daily"
              ? "bg-[#ffd964] text-black shadow-sm"
              : "text-gray-600"
          }`}
        >
          일반 구매
        </button>
        <button
          onClick={() => setPurchaseMode("specific")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
            purchaseMode === "specific"
              ? "bg-[#ffd964] text-black shadow-sm"
              : "text-gray-600"
          }`}
        >
          자투리 구매
        </button>
      </div>
      {purchaseMode === "specific" && (
        <Card className="bg-gradient-to-br from-[#fefaef] to-[#ffe8c6] border-[#ffd964]">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {fragmentAmount[0] >= 1
                  ? `${fragmentAmount[0]}GB`
                  : `${fragmentAmount[0] * 1000}MB`}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                데이터를 구매할 수 있어요!
                <br />
                구매할 만큼 드래그 해주세요
              </p>
            </div>

            <div className="mb-6">
              <Slider
                value={fragmentAmount}
                onValueChange={setFragmentAmount}
                max={2}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>100MB</span>
                <span>2GB</span>
              </div>
            </div>

            <Button className="w-full h-12 bg-[#119c72] hover:bg-[#0d7a5a] text-white">
              검색하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
