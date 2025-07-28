"use client";

import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import TabTitle from "@feature/mypage/components/sections/TabTitle";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getSaleHistoryList } from "@feature/mypage/apis/mypageRequest";
import { HistoryCard } from "@feature/mypage/components/sections/sale/HistoryCard";
import { SaleHistoryType } from "@feature/mypage/types/mypageTypes";
import { useSearchParams } from "next/navigation";

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
        renderItem={(item) => <HistoryCard data={item} key={item.productId} />}
        mode="button"
        height="calc( 50vh + 19px )"
      />
    </div>
  );
}
