"use client";

import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getPurchaseHistoryList } from "@feature/mypage/apis/mypageRequest";
import { PurchaseHistoryType } from "@feature/mypage/types/mypageTypes";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import PurchaseHistoryCard from "@feature/mypage/components/sections/purchase/PurchaseHistoryCard";
import TabTitle from "../TabTitle";

export default function PurchaseHistoryList() {
  const {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    totalNum,
  } = useVirtualizedInfiniteQuery<PurchaseHistoryType>({
    queryKey: ["api/trades/purchase-history"],
    queryFn: ({ pageParam }) => getPurchaseHistoryList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 160,
    mode: "button",
  });

  return (
    <>
      <TabTitle listLength={totalNum ?? 0}></TabTitle>
      <VirtualizedInfiniteList
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        items={flatItems}
        height="100%"
        renderItem={(index, item) => (
          <PurchaseHistoryCard data={item} key={item ? item.id : index} />
        )}
        mode="button"
      />
    </>
  );
}
