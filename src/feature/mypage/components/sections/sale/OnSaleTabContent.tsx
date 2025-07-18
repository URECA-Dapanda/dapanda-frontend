import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import TabTitle from "../TabTitle";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { HistoryType } from "@feature/mypage/types/mypageTypes";
import { getDataList } from "@feature/mypage/apis/mypageRequest";
import { HistoryCard } from "../HistoryCard";

export default function OnSaleTabContent() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<HistoryType>({
      queryKey: ["dataItems", "default"],
      queryFn: ({ pageParam = 0 }) => getDataList({ pageParam, isSold: false }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "button",
    });

  return (
    <div className="mt-12">
      <TabTitle listLength={13}>판매 중</TabTitle>

      <VirtualizedInfiniteList
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        items={flatItems}
        renderItem={(item) => <HistoryCard data={item} key={item.id} />}
        mode="button"
        height="400px"
      />
    </div>
  );
}
