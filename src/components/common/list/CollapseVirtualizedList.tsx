import React, { useEffect, useState } from "react";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface CollapseVirtualizedListProps<T> {
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  items: T[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

/**
 * CollapseVirtualizedList 컴포넌트
 *
 * 가상 리스트(Virtualized List) 형태로 아이템을 렌더링하며,
 * 초기에 카드들을 겹쳐서 보여주고, 사용자가 "더보기" 버튼을 누르면 전체 목록을 펼쳐서 보여주는 컴포넌트입니다.
 *
 * 일반적인 스크롤 또는 버튼 기반의 무한 스크롤과는 달리,
 * collapse 모드는 펼쳐보기 UI 패턴에 적합하며 초기 렌더링 부담을 줄일 수 있습니다.
 *
 * @template T - 렌더링할 각 항목(item)의 데이터 타입
 *
 * @param parentRef - 리스트가 렌더링될 스크롤 컨테이너의 참조 (useVirtualizer에서 사용)
 * @param rowVirtualizer - @tanstack/react-virtual에서 생성한 Virtualizer 인스턴스
 * @param items - 렌더링할 전체 아이템 배열
 * @param isFetchingNextPage - 다음 페이지 데이터를 가져오는 중인지 여부
 * @param fetchNextPage - 다음 페이지 데이터를 가져오는 함수
 * @param hasNextPage - 추가 페이지가 존재하는지 여부
 * @param renderItem - 각 아이템을 렌더링할 React 노드 반환 함수 (item, index) => ReactNode
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
 * } = useVirtualizedInfiniteQuery({...});
 *
 * <CollapseVirtualizedList
 *   parentRef={parentRef}
 *   rowVirtualizer={rowVirtualizer}
 *   items={flatItems}
 *   isFetchingNextPage={isFetchingNextPage}
 *   fetchNextPage={fetchNextPage}
 *   hasNextPage={hasNextPage}
 *   renderItem={(item) => <Card item={item} />}
 * />
 * ```
 */
function CollapseVirtualizedList<T>({
  parentRef,
  rowVirtualizer,
  items,
  isFetchingNextPage,
  renderItem,
}: CollapseVirtualizedListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
  }, [isExpanded, rowVirtualizer]);

  const totalHeight = rowVirtualizer.getTotalSize();
  const virtualItems = rowVirtualizer.getVirtualItems();

  const getCardTop = (virtualRow: VirtualItem, index: number) =>
    isExpanded ? virtualRow.start : index * 10;

  const containerHeight = isExpanded ? 600 : 250;

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: containerHeight,
          overflow: !isExpanded ? "hidden" : "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            height: `${totalHeight}px`,
            position: "relative",
            overflow: isExpanded ? "hidden" : "auto",
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
          marginTop: isExpanded ? -50 : -150,
          position: "relative",
          zIndex: !isExpanded ? items.length + 1 : undefined,
        }}
      >
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-primary"
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            position: "relative",
            zIndex: !isExpanded ? items.length + 1 : undefined,
          }}
        >
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>
    </>
  );
}

export default CollapseVirtualizedList as typeof CollapseVirtualizedList;
