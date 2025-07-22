"use client";

import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getReviewList } from "@feature/mypage/apis/reviewRequest";
import { ReviewType } from "@feature/mypage/types/reviewType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import ReviewItem from "@feature/mypage/components/sections/review/ReviewItem";

export default function ReviewList() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<ReviewType>({
      queryKey: ["review"],
      queryFn: ({ pageParam = 0 }) =>
        getReviewList({
          pageParam,
          size: 2,
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 130,
      mode: "button",
    });

  return (
    <div className="flex flex-col h-full mt-24">
      <VirtualizedInfiniteList
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        items={flatItems}
        height="400px"
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(item) => <ReviewItem data={item} key={item.reviewId} />}
        mode="button"
      />
    </div>
  );
}
