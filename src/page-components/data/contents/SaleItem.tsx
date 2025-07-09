"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { SaleItemType } from "@type/Sale";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";

interface SellItemProps {
  data: SaleItemType;
}

function SaleItem({ data }: SellItemProps) {
  const router = useRouter();

  const handleUserProfileClick = useCallback(() => {
    router.push(`/profile/${data.userId}`);
  }, []);

  const handleDirectPurchase = useCallback(
    () => console.log("바로구매 클릭"),
    []
  );

  const price = useMemo(() => data.price.toLocaleString(), []);

  return (
    <Card
      key={data.id}
      className="bg-white shadow-sm border border-gray-200 rounded-2xl"
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={handleUserProfileClick}>
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gray-200 text-gray-600">
                  {data.seller.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <button onClick={handleUserProfileClick}>
                  <span className="font-medium text-gray-900 hover:underline">
                    {data.seller}
                  </span>
                </button>
                <span className="text-sm text-gray-500">{data.timeAgo}</span>
              </div>
              <div className="text-gray-600 mb-1">
                {data.totalAmount >= 1
                  ? `${data.totalAmount}GB`
                  : `${data.totalAmount * 1000}MB`}{" "}
                • {data.pricePer100MB}원/100MB
              </div>
              <div className="text-lg font-bold text-[#119c72]">{price}원</div>
            </div>
          </div>
          <div className="ml-4">
            <Button
              className="bg-[#ffd964] hover:bg-[#ffe8c6] text-black font-medium rounded-lg h-10 px-6"
              onClick={handleDirectPurchase}
            >
              바로구매
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(SaleItem);
