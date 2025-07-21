import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getDataList } from "@feature/data/api/dataRequest";
import DataItemCard from "@feature/data/components/sections/product/DataItemCard";
import { DataType } from "@feature/data/types/dataType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { Fragment } from "react";
import TabTitle from "../TabTitle";

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
      estimateSize: () => 150,
      mode: "button",
    });

  return (
    <Fragment>
      <TabTitle listLength={13} />
      <VirtualizedInfiniteList
        mode="button"
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        height="350px"
        items={flatItems}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(item: DataType) => (
          <div className="px-24">
            <DataItemCard data={item} type="default" />
          </div>
        )}
      />
    </Fragment>
  );
}
