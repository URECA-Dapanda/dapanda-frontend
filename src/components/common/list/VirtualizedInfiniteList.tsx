"use client";

import React, { useRef, useEffect, memo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getDataList } from "@feature/data/api/dataRequest";
import DataItemCard from "@feature/data/components/sections/product/DataItemCard";

function VirtualizedInfiniteList() {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: getDataList,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const flatItems = data?.pages.flatMap((page) => page.items) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatItems.length + 1 : flatItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    const lastItem = virtualItems[virtualItems.length - 1];

    if (lastItem && lastItem.index >= flatItems.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [rowVirtualizer.getVirtualItems()]);

  return (
    <div
      ref={parentRef}
      style={{
        height: "600px",
        overflow: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > flatItems.length - 1;
          const item = flatItems[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
                padding: "16px",
                background: "white",
              }}
            >
              {isLoaderRow ? "Loading more..." : <DataItemCard data={item} key={item.id} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(VirtualizedInfiniteList, (prevProps, nextProps) => {
  return prevProps === nextProps;
});
