import { VirtualItem } from "@tanstack/react-virtual";
import React, { memo } from "react";

interface VirtualizedListProps<T> {
  mode?: "scroll" | "button";
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: any;
  items: T[];
  isFetchingNextPage: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function VirtualizedList<T>({
  parentRef,
  rowVirtualizer,
  items,
  mode = "scroll",
  isFetchingNextPage,
  renderItem,
}: VirtualizedListProps<T>) {
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
        {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
          const isLoaderRow = virtualRow.index > items.length - 1;
          const item = items[virtualRow.index];

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
              {isLoaderRow
                ? isFetchingNextPage
                  ? "Loading more..."
                  : null
                : renderItem(item, virtualRow.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(VirtualizedList) as typeof VirtualizedList;
