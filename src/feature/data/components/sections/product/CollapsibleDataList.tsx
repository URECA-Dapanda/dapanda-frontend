import CollapseVirtualizedList from "@components/common/list/CollapseVirtualizedList";
import { getDataList } from "@feature/data/api/dataRequest";
import { DataType } from "@feature/data/types/dataType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { QueryFunctionContext } from "@tanstack/react-query";
import DataItemCard from "./DataItemCard";

export default function CollapsibleDataList() {
  const {
    parentRef: parentRefForData,
    rowVirtualizer: rowVirtualizerForData,
    flatItems: flatItemsForData,
    isFetchingNextPage: isFetchingNextPageForData,
    hasNextPage: hasNextPageForData,
    fetchNextPage: fetchNextPageForData,
  } = useVirtualizedInfiniteQuery<DataType>({
    queryKey: ["dataItems"],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) => getDataList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 200,
    mode: "scroll",
  });

  return (
    <CollapseVirtualizedList
      parentRef={parentRefForData}
      rowVirtualizer={rowVirtualizerForData}
      items={flatItemsForData}
      isFetchingNextPage={isFetchingNextPageForData}
      hasNextPage={hasNextPageForData}
      fetchNextPage={fetchNextPageForData}
      renderItem={(item: DataType) => <DataItemCard data={item} type="scrap" />}
    />
  );
}
