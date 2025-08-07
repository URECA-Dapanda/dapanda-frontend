"use client";

import { useSearchParams } from "next/navigation";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import TabTitle from "@feature/mypage/components/sections/TabTitle";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getSaleHistoryList } from "@feature/mypage/apis/mypageRequest";
import { HistoryCard } from "@feature/mypage/components/sections/sale/HistoryCard";
import { SaleHistoryType } from "@feature/mypage/types/mypageTypes";

export default function OnSaleTabContent() {
  const params = useSearchParams();
  const id = params.get("id") ?? undefined;
  const {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    totalNum,
  } = useVirtualizedInfiniteQuery<SaleHistoryType>({
    queryKey: ["/api/selling-products"],
    queryFn: ({ pageParam = 0 }) =>
      getSaleHistoryList({ pageParam, productState: "ACTIVE", id: id }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 130,
    mode: "button",
  });

  return (
    <div className="mt-12">
      <TabTitle listLength={totalNum ?? 0}></TabTitle>

      <VirtualizedInfiniteList
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        items={flatItems}
        renderItem={(index, item) => (
          <HistoryCard data={item} key={item ? item.productId : index} />
        )}
        mode="button"
        height={
          id
            ? "calc( 100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 108px - 152px - 24px - 36px - 30px - 12px )"
            : "calc( 100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 108px - 102px - 8px - 12px - 44px - 24px )"
        }
        subMessage="판매 중인 상품이 없습니다."
      />
    </div>
  );
}
