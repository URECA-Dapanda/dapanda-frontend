import { useRef, useEffect } from "react";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

type PageResponse<TData> = {
  items: TData[];
  nextCursor?: number;
};

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
    initialPageParam: 0,
  });

  const flatItems = data?.pages.flatMap((page) => page.items) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatItems.length + 1 : flatItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 5,
  });

  useEffect(() => {
    if (mode !== "scroll") return;

    const virtualItems = rowVirtualizer.getVirtualItems();
    const lastItem = virtualItems[virtualItems.length - 1];

    if (lastItem && lastItem.index >= flatItems.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [rowVirtualizer.getVirtualItems()]);

  return {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
