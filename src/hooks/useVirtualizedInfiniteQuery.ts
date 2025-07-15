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
  };
}
