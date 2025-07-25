"use client";

import { useSearchParams } from "next/navigation";
import ReviewBottomSheet from "@feature/map/components/sections/review/ReviewBottomSheet";
import { useEffect } from "react";
//import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
//import type { WifiDetailResponse } from "@/feature/map/api/getMapDetailById";

export default function ReviewPageContent() {
  const params = useSearchParams();
  // const tradeId = Number(params.get("tradeId"));
  const tradeId = 130;
  const productId = Number(params.get("productId"));
  const memberName = params.get("memberName") || "홍길동";
  const address = params.get("address") || "서울시 강남구";
  const price = Number(params.get("price")) || 8000;
  const unitPrice = Number(params.get("unitPrice")) || 200;
  const usedMinutes = Number(params.get("usedMinutes")) || 40;

  //const [mapDetail, setMapDetail] = useState<WifiDetailResponse | null>(null);

  useEffect(() => {
    if (!productId) return;
    //getMapDetailById(String(productId)).then((data) => {
    //  setMapDetail(data);
    //});
  }, [productId]);

  if (!tradeId || isNaN(tradeId)) {
    return <div>잘못된 접근입니다. tradeId가 없습니다.</div>;
  }

  return (
    <ReviewBottomSheet
      isOpen={true}
      onClose={() => {}}
      tradeId={tradeId}
      memberName={memberName}
      address={address}
      price={price}
      unitPrice={unitPrice}
      usedMinutes={usedMinutes}
    />
  );
}
