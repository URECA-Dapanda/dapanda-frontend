import { ChevronDown, ChevronUp } from "lucide-react";
import { mapRawToDataType, RawDataItem } from "@feature/data/types/dataType";
import DataItemCard from "@feature/data/components/sections/default/DataItemCard";
import { ScrapRecommendationSummary } from "@feature/data/types/scrapTypes";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import { ButtonComponent } from "@components/common/button";
import { formatPriceString } from "@lib/formatters";

interface CollapsibleDataListProps {
  items: RawDataItem[];
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

  // UI용: DataType으로 변환 (문자열로 표시용)
  const displayItems = items.map(mapRawToDataType);

  // 결제용: 실제 숫자 계산용 데이터
  const transformedCombinations = items.map((item) => ({
    productId: item.productId,
    mobileDataId: item.mobileDataId,
    memberName: item.memberName,
    price: item.price,
    pricePer100MB: item.pricePer100MB,
    purchasePrice: Math.floor(item.purchaseAmount! * item.pricePer100MB * 10),
    remainAmount: item.remainAmount,
    purchaseAmount: item.purchaseAmount!,
    splitType: item.splitType,
    updatedAt: item.updatedAt,
  }));

  console.log("transformedCombinations", transformedCombinations);

  return (
    <div className="relative w-full space-y-16">
      <div className="relative h-[calc(100dvh-env(safe-area-inset-bottom)-env(safe-area-inset-top)-368px)] overflow-y-scroll">
        {!isExpanded ? (
          <div className="relative">
            {displayItems.slice(0, 3).map((item, index) => (
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
            {displayItems.map((item) => (
              <DataItemCard key={item.productId} data={item} type="scrap" size="sm" />
            ))}
          </div>
        )}
      </div>

      {displayItems.length > 1 && (
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
      {(isExpanded || displayItems.length <= 1) && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+72px)] w-[calc(100%-48px)] lg:w-[552px] bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg shadow-gray-500 p-6 px-8 flex justify-between items-center">
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
