import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import TabTitle from "@feature/mypage/components/sections/TabTitle";
import { HistoryCard } from "@feature/mypage/components/sections/sale/HistoryCard";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { SaleHistoryType } from "@feature/mypage/types/mypageTypes";
import { getSaleHistoryList } from "@feature/mypage/apis/mypageRequest";

export default function SoldoutTabContent() {
  const {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    totalNum,
  } = useVirtualizedInfiniteQuery<SaleHistoryType>({
    queryKey: ["dataItems"],
    queryFn: ({ pageParam = 0 }) => getSaleHistoryList({ pageParam, productState: "SOLD_OUT" }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 162,
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
          <HistoryCard data={item} key={item ? item.productId : index} size="lg" />
        )}
        mode="button"
        height="63dvh"
      />
    </div>
  );
}
