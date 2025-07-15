import React, { useEffect, useState } from "react";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

interface CollapseVirtualizedListProps<T> {
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  items: T[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function CollapseVirtualizedList<T>({
  parentRef,
  rowVirtualizer,
  items,
  isFetchingNextPage,
  renderItem,
}: CollapseVirtualizedListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      rowVirtualizer.scrollToIndex(0);
      console.log("Expanded, scrolling to top");
    }
    console.log("collapsed, scrolling to top");
  }, [isExpanded, rowVirtualizer]);

  const totalHeight = rowVirtualizer.getTotalSize();
  const virtualItems = rowVirtualizer.getVirtualItems();

  const getCardTop = (virtualRow: VirtualItem, index: number) =>
    isExpanded ? virtualRow.start : index * 10;

  const containerHeight = isExpanded ? 600 : 100;

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: containerHeight,
          overflow: !isExpanded ? "visible" : "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            height: `${totalHeight}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {virtualItems.map((virtualRow, index) => {
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
                  transform: `translateY(${getCardTop(virtualRow, index)}px)`,
                  padding: "0 16px",
                  zIndex: !isExpanded ? items.length - index : undefined,
                  borderRadius: !isExpanded ? 8 : undefined,
                  transition: "transform 0.3s ease",
                  visibility: !isExpanded && index > 3 ? "hidden" : "visible",
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

      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          position: "relative",
          zIndex: !isExpanded ? items.length + 1 : undefined,
        }}
      >
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{
            padding: "8px 16px",
            background: "#333",
            color: "#fff",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            position: "relative",
            zIndex: !isExpanded ? items.length + 1 : undefined, // ✅ 카드 위로
          }}
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
      </div>
    </>
  );
}

export default CollapseVirtualizedList as typeof CollapseVirtualizedList;
