import { VirtualItem } from "@tanstack/react-virtual";
import React, { Fragment, memo } from "react";

interface VirtualizedListProps<T> {
  mode?: "scroll" | "button";
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: any;
  items: T[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function VirtualizedList<T>({
  parentRef,
  rowVirtualizer,
  items,
  mode = "scroll",
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
}: VirtualizedListProps<T>) {
  const virtualItems = rowVirtualizer.getVirtualItems();

  const totalHeight = rowVirtualizer.getTotalSize();

  return (
    <Fragment>
      <div
        ref={parentRef}
        style={{
          height: "600px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${totalHeight - 200}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {virtualItems.map((virtualRow: VirtualItem) => {
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
                  padding: "0px 16px",
                }}
              >
                {mode === "scroll" && isLoaderRow
                  ? isFetchingNextPage
                    ? "Loading more..."
                    : null
                  : !isLoaderRow
                  ? renderItem(item, virtualRow.index)
                  : null}
              </div>
            );
          })}
        </div>
        {mode === "button" && hasNextPage && (
          <div style={{ textAlign: "center" }} className={`${mode === "button" ? "" : "hidden"}`}>
            <button
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              style={{
                padding: "8px 16px",
                background: "#333",
                color: "#fff",
                borderRadius: "4px",
                border: "none",
                cursor: isFetchingNextPage ? "not-allowed" : "pointer",
              }}
            >
              {isFetchingNextPage ? "로딩 중..." : "더보기"}
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default memo(VirtualizedList) as typeof VirtualizedList;
