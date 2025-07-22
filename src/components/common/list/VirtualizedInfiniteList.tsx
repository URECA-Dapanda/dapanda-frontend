import React, { memo } from "react";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { ButtonComponent } from "@components/common/button";

interface VirtualizedListProps<T> {
  mode?: "scroll" | "button";
  height?: string;
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  items: T[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

/**
 * VirtualizedList 컴포넌트
 *
 * 대량의 데이터를 가상화하여 렌더링 성능을 향상시키는 리스트 컴포넌트입니다.
 * `@tanstack/react-virtual` 라이브러리를 사용하여 화면에 표시되는 항목만 실제로 렌더링하고,
 * 무한 스크롤 또는 "더보기" 버튼 기반의 페이지네이션을 지원합니다.
 *
 * mode가 `"scroll"`인 경우 스크롤 하단 도달 시 자동으로 데이터를 가져오며,
 * `"button"`인 경우 "더보기" 버튼을 통해 명시적으로 다음 데이터를 요청합니다.
 *
 * @template T - 리스트 항목(item)의 데이터 타입
 *
 * @param mode - 로딩 방식 선택 ("scroll" | "button"), 기본값은 "scroll"
 * @param parentRef - 가상화 스크롤 컨테이너의 참조
 * @param rowVirtualizer - @tanstack/react-virtual에서 생성된 Virtualizer 인스턴스
 * @param items - 렌더링할 아이템 배열
 * @param isFetchingNextPage - 다음 페이지를 가져오는 중인지 여부
 * @param fetchNextPage - 다음 페이지 데이터를 가져오는 함수
 * @param hasNextPage - 다음 페이지가 존재하는지 여부
 * @param renderItem - 각 아이템을 렌더링하는 함수 (item, index) => ReactNode
 *
 * @example
 * ```tsx
 * const {
 *   parentRef,
 *   rowVirtualizer,
 *   flatItems,
 *   isFetchingNextPage,
 *   fetchNextPage,
 *   hasNextPage,
 * } = useVirtualizedInfiniteQuery(...);
 *
 * <VirtualizedList
 *   mode="scroll"
 *   parentRef={parentRef}
 *   rowVirtualizer={rowVirtualizer}
 *   items={flatItems}
 *   isFetchingNextPage={isFetchingNextPage}
 *   fetchNextPage={fetchNextPage}
 *   hasNextPage={hasNextPage}
 *   renderItem={(item) => <Card data={item} />}
 * />
 * ```
 */
function VirtualizedList<T>({
  parentRef,
  rowVirtualizer,
  items,
  height = "600px",
  mode = "scroll",
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
}: VirtualizedListProps<T>) {
  const virtualItems = rowVirtualizer.getVirtualItems();

  const totalHeight = rowVirtualizer.getTotalSize();

  return (
    <div className="flex-1 min-h-0">
      <div
        ref={parentRef}
        style={{
          height: height,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${totalHeight - 120}px`,
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
                  padding: "0px",
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
            <ButtonComponent
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              variant={"nonoutline"}
              className="text-gray-600 w-full shadow-none mb-[50px]"
              size={"sm"}
            >
              {isFetchingNextPage ? "로딩 중..." : "더보기"}
            </ButtonComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(VirtualizedList) as typeof VirtualizedList;
