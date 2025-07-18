"use client";

import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getPurchaseHistoryList } from "@feature/mypage/apis/mypageRequest";
import { PurchaseHistoryType } from "@feature/mypage/types/mypageTypes";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import PurchaseHistoryCard from "./PurchaseHistoryCard";

export default function PurchaseHistoryList() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<PurchaseHistoryType>({
      queryKey: ["dataItems", "default"],
      queryFn: ({ pageParam = 0 }) => getPurchaseHistoryList({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "button",
    });

  return (
    <VirtualizedInfiniteList
      parentRef={parentRef}
      rowVirtualizer={rowVirtualizer}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      items={flatItems}
      renderItem={(item) => <PurchaseHistoryCard data={item} key={item.id} />}
      mode="button"
    />
  );
}
