import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getDataList } from "@feature/data/api/dataRequest";
import DataItemCard from "@feature/data/components/sections/product/DataItemCard";
import { DataType } from "@feature/data/types/dataType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";

export default function SellingList() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<DataType>({
      queryKey: ["dataItems"],
      queryFn: ({ pageParam = 0 }) =>
        getDataList({
          pageParam,
          size: 2,
          sort: "RECENT",
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 130,
      mode: "button",
    });

  return (
    <VirtualizedInfiniteList
      mode="button"
      parentRef={parentRef}
      rowVirtualizer={rowVirtualizer}
      height="400px"
      items={flatItems}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(item: DataType) => <DataItemCard data={item} type="default" />}
    />
  );
}
