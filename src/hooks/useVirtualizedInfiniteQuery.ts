import { useRef, useEffect } from "react";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

type PageResponse<TData> = {
  items: TData[];
  num?: number;
  nextCursor?: number;
};

/**
 * useVirtualizedInfiniteQuery 훅
 *
 * React Query의 useInfiniteQuery와 @tanstack/react-virtual의 useVirtualizer를 결합하여
 * 가상화된 무한 스크롤 리스트를 간편하게 구현할 수 있는 커스텀 훅입니다.
 *
 * `scroll` 모드에서는 스크롤이 리스트 하단에 도달했을 때 자동으로 다음 페이지를 요청하며,
 * `button` 모드에서는 수동으로 `fetchNextPage`를 호출해야 데이터를 가져옵니다.
 *
 * 반환값으로는 virtualizer와 리스트 데이터, 상태 정보 등을 포함하며,
 * VirtualizedList 또는 CollapseVirtualizedList 등과 함께 사용하기 적합합니다.
 *
 * @template TData - 각 페이지의 item 타입
 *
 * @param queryKey - React Query에서 사용하는 쿼리 키
 * @param queryFn - 페이지 데이터를 가져오는 쿼리 함수
 * @param getNextPageParam - 다음 페이지 요청을 위한 cursor 추출 함수
 * @param estimateSize - 각 아이템의 예상 높이를 반환하는 함수 (기본값: 100)
 * @param mode - 스크롤 방식 ("scroll" | "button"), 기본값은 "scroll"
 *
 * @returns
 * - `parentRef`: 가상화 컨테이너의 ref
 * - `rowVirtualizer`: Virtualizer 인스턴스
 * - `flatItems`: 현재까지 로드된 전체 아이템(flattened)
 * - `isFetchingNextPage`: 다음 페이지를 가져오는 중인지 여부
 * - `hasNextPage`: 다음 페이지가 존재하는지 여부
 * - `fetchNextPage`: 다음 페이지를 요청하는 함수
 *
 * @example
 * ```tsx
 * const {
 *   parentRef,
 *   rowVirtualizer,
 *   flatItems,
 *   isFetchingNextPage,
 *   hasNextPage,
 *   fetchNextPage,
 * } = useVirtualizedInfiniteQuery({
 *   queryKey: ["posts"],
 *   queryFn: fetchPosts,
 *   getNextPageParam: (lastPage) => lastPage.nextCursor,
 * });
 * ```
 */
export function useVirtualizedInfiniteQuery<TData>({
  queryKey,
  queryFn,
  getNextPageParam,
  estimateSize = () => 100,
  mode = "scroll",
}: {
  queryKey: string[];
  queryFn: (ctx: QueryFunctionContext) => Promise<PageResponse<TData>>;
  getNextPageParam: (lastPage: PageResponse<TData>, allPages: PageResponse<TData>[]) => unknown;
  estimateSize?: () => number;
  mode?: "scroll" | "button";
}) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    PageResponse<TData>
  >({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam: undefined,
  });

  let totalNum: number | undefined;

  const flatItems =
    data?.pages.flatMap((page) => {
      totalNum = page.num;
      return page.items;
    }) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatItems.length + 1 : flatItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 5,
  });

  useEffect(() => {
    if (mode !== "scroll") return;

    const el = parentRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    const handleScroll = () => {
      const scrollBottom = el.scrollTop + el.clientHeight;
      const scrollHeight = el.scrollHeight;

      const distanceToBottom = scrollHeight - scrollBottom;

      if (distanceToBottom < 150) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [mode, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    totalNum,
  };
}
