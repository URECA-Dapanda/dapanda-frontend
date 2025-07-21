import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import TabTitle from "../TabTitle";
import { HistoryCard } from "./HistoryCard";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { SaleHistoryType } from "@feature/mypage/types/mypageTypes";
import { getSaleHistoryList } from "@feature/mypage/apis/mypageRequest";

export default function SoldoutTabContent() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<SaleHistoryType>({
      queryKey: ["dataItems", "default"],
      queryFn: ({ pageParam = 0 }) => getSaleHistoryList({ pageParam, isSold: true }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 192,
      mode: "button",
    });

  return (
    <div className="mt-12">
      <TabTitle listLength={13}></TabTitle>

      <VirtualizedInfiniteList
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        items={flatItems}
        renderItem={(item) => <HistoryCard data={item} key={item.id} size="lg" />}
        mode="button"
        height="400px"
      />
    </div>
  );
}
