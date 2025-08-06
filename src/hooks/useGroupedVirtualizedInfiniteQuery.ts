import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCashHistoryList } from "@feature/mypage/apis/mypageRequest";

export function useVirtualizedGroupedInfiniteQuery({
  year,
  month,
}: {
  year: string;
  month: string;
}) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["cash-history", year, month],
    queryFn: ({ pageParam }) =>
      getCashHistoryList({
        pageParam,
        year,
        month,
        size: 20,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return {
    parentRef,
    pages: data?.pages ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}
