"use client";

import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getReviewList } from "@feature/mypage/apis/reviewRequest";
import { ReviewType } from "@feature/mypage/types/reviewType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import ReviewItem from "./ReviewItem";

export default function ReviewList() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<ReviewType>({
      queryKey: ["review"],
      queryFn: ({ pageParam = 0 }) =>
        getReviewList({
          pageParam,
          memberId: "3",
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "scroll",
    });

  return (
    <VirtualizedInfiniteList
      parentRef={parentRef}
      rowVirtualizer={rowVirtualizer}
      items={flatItems}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(item) => <ReviewItem data={item} key={item.reviewId} />}
      mode="button"
    />
  );
}
