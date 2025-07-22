"use client";

import { Fragment } from "react";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getReviewList } from "@feature/mypage/apis/reviewRequest";
import { ReviewType } from "@feature/mypage/types/reviewType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import ReviewItem from "@feature/mypage/components/sections/review/ReviewItem";
import TabTitle from "@feature/mypage/components/sections/TabTitle";

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
      mode: "scroll",
    });

  return (
    <Fragment>
      <TabTitle listLength={13} />
      <VirtualizedInfiniteList
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        items={flatItems}
        height="350px"
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(item) => <ReviewItem data={item} key={item.reviewId} />}
        mode="button"
      />
    </Fragment>
  );
}
