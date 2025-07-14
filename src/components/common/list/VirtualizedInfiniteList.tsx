"use client";

import React, { useRef, useEffect, memo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

// 🚧 더미 API: 20개씩 페이징된 데이터를 반환
const fetchItems = async ({ pageParam = 0 }): Promise<{ items: string[]; nextCursor?: number }> => {
  await new Promise((r) => setTimeout(r, 500)); // simulate network latency
  const start = pageParam;
  const end = pageParam + 20;
  const items = Array.from({ length: 20 }, (_, i) => `Item ${start + i + 1}`);

  const hasMore = end < 200;
  return {
    items,
    nextCursor: hasMore ? end : undefined,
  };
};

// ✅ 실제 Infinite + Virtualized List 컴포넌트
function VirtualizedInfiniteList() {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const flatItems = data?.pages.flatMap((page) => page.items) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatItems.length + 1 : flatItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
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
                borderBottom: "1px solid #eee",
                background: "white",
              }}
            >
              {isLoaderRow ? "Loading more..." : item}
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
