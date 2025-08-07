"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CashHistoryDateBox from "@feature/mypage/components/sections/profile/CashHistoryDateBox";
import MonthlyCashTotalBox from "@feature/mypage/components/sections/profile/MonthlyCashTotalBox";
import MonthPicker from "@components/common/calendar/MonthPicker";
import { useVirtualizedGroupedInfiniteQuery } from "@hooks/useGroupedVirtualizedInfiniteQuery";
import EmptyState from "@components/common/empty/EmptyState";

export default function CashHistoryContent() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const month = (currentDate.get("month") + 1).toString();
  const year = currentDate.get("year").toString();

  const { parentRef, pages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useVirtualizedGroupedInfiniteQuery({ year, month });

  const handleDate = (newDate: Dayjs) => {
    setCurrentDate(newDate);
  };
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col gap-24 items-center w-full">
      <Suspense>
        <MonthlyCashTotalBox data={pages.at(0)?.monthlyInfo} />
      </Suspense>
      <MonthPicker value={currentDate} onChange={handleDate} />
      <Suspense>
        <div
          ref={parentRef}
          className="overflow-auto h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-108px-219px-48px-32px)] px-24 space-y-6 w-full"
        >
          {pages.map((page, i) => (
            <div key={i} className="space-y-6">
              {Object.entries(page.items).length !== 0 ? (
                Object.entries(page.items).map(
                  ([date, items]) =>
                    items && (
                      <CashHistoryDateBox key={`${date}-${i}`} date={date} dataList={items} />
                    )
                )
              ) : (
                <div className=" items-center flex justify-center">
                  <EmptyState
                    message="캐시 이용 내역이 없습니다."
                    subMessage="서비스를 이용해 보세요."
                  />
                </div>
              )}
            </div>
          ))}
          {hasNextPage && (
            <div ref={observerRef} className="py-10 text-center text-sm text-gray-400">
              불러오는 중...
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}
