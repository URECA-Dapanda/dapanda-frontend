"use client";

import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getReviewList } from "@feature/mypage/apis/reviewRequest";
import { ReviewType } from "@feature/mypage/types/reviewType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import ReviewItem from "@feature/mypage/components/sections/review/ReviewItem";
import { MouseEvent, useCallback, useState } from "react";
import ReportModal from "@components/common/modal/ReportModal";
import { useSearchParams } from "next/navigation";

export default function ReviewList({ type }: { type?: "receive" | "post" }) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<string>();
  const [currentName, setCurrentName] = useState<string>("알 수 없음");
  const id = searchParams.get("id") ?? undefined;
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<ReviewType>({
      queryKey: ["review"],
      queryFn: ({ pageParam }) =>
        getReviewList({
          pageParam,
          size: 2,
          id,
          type,
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 130,
      mode: "button",
    });

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.value;
    const name = e.currentTarget.dataset.name ?? "알 수 없음";
    setCurrentTarget(target);
    setCurrentName(name);
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className="flex flex-col h-full mt-24">
        <VirtualizedInfiniteList
          parentRef={parentRef}
          rowVirtualizer={rowVirtualizer}
          items={flatItems}
          height="400px"
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={(item) => (
            <ReviewItem data={item} key={item.reviewId} handleClick={handleClick} />
          )}
          mode="button"
        />
      </div>
      <ReportModal
        targetId={currentTarget}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        targetName={currentName}
      />
    </>
  );
}
