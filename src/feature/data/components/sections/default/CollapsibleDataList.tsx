import { ChevronDown, ChevronUp } from "lucide-react";
import { DataType } from "@feature/data/types/dataType";
import DataItemCard from "@feature/data/components/sections/default/DataItemCard";
import { ButtonComponent } from "@components/common/button";
import { ScrapRecommendationSummary } from "@feature/data/types/scrapTypes";
import { formatPriceString } from "@lib/formatters";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";

interface CollapsibleDataListProps {
  items: DataType[];
  summary: ScrapRecommendationSummary;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CollapsibleDataList({
  items,
  isExpanded,
  summary,
  onToggle,
}: CollapsibleDataListProps) {
  const setPayment = usePaymentStore((state) => state.setInfo);

  const transformedCombinations = items.map((item) => ({
    productId: item.productId,
    mobileDataId: item.mobileDataId,
    memberName: item.memberName,
    price: Number(item.price.replace(/[^0-9]/g, "")),
    purchasePrice: Number(item.price.replace(/[^0-9]/g, "")),
    remainAmount: parseFloat(item.title),
    purchaseAmount: item.purchaseAmount,
    pricePer100MB: Number(item.pricePer100MB.replace(/[^0-9]/g, "")),
    splitType: item.splitType,
    updatedAt: item.date,
  }));

  console.log("transformedCombinations", transformedCombinations);

  return (
    <div className="relative w-full space-y-16">
      <div className="relative h-[calc(100dvh-env(safe-area-inset-bottom)-env(safe-area-inset-top)-368px)] overflow-y-scroll">
        {!isExpanded ? (
          <div className="relative">
            {items.slice(0, 3).map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="absolute left-0 right-0"
                style={{
                  top: index * 6,
                  zIndex: 10 - index,
                  transform: `translateY(${index * 6}px)`,
                }}
              >
                <DataItemCard data={item} type="scrap" size="sm" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12 pb-60">
            {items.map((item) => (
              <DataItemCard key={item.productId} data={item} type="scrap" size="sm" />
            ))}
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div
          className={`flex justify-center ${
            isExpanded
              ? "fixed bottom-[calc(env(safe-area-inset-bottom)+96px)]"
              : "fixed top-[calc(env(safe-area-inset-bottom)+400px)] "
          }  z-10 transition-normal duration-300 left-0 right-0 mx-auto mt-16`}
        >
          <button
            onClick={onToggle}
            className="bg-white rounded-full shadow-md p-8 border border-gray-300"
            aria-label={isExpanded ? "조합 접기" : "조합 펼쳐보기"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      )}
      {(isExpanded || items.length <= 1) && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+72px)] w-[calc(100%-48px)] bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg shadow-gray-500 p-6 px-8 flex justify-between items-center">
          <div>
            <p className="title-sm">총 용량 {summary.totalAmount}GB</p>
            <p className="title-sm">총 가격 {formatPriceString(summary.totalPrice)}</p>
          </div>
          <ButtonComponent
            variant="secondary"
            size="3xl"
            className="w-152"
            onClick={() =>
              setPayment({
                type: "data",
                badge: "자투리 구매",
                title: `${summary.totalAmount}GB`,
                price: formatPriceString(summary.totalPrice),
                totalAmount: summary.totalAmount,
                totalPrice: summary.totalPrice,
                combinations: transformedCombinations,
              })
            }
          >
            확정하고 결제하기
          </ButtonComponent>
        </div>
      )}
    </div>
  );
}
