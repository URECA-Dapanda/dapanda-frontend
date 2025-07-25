"use client";

import MonthPicker from "@components/common/calendar/MonthPicker";
import dayjs, { Dayjs } from "dayjs";
import { Suspense, useEffect, useRef, useState } from "react";
import CashHistoryDateBox from "../sections/profile/CashHistoryDateBox";
import { useVirtualizedGroupedInfiniteQuery } from "@hooks/useGroupedVirtualizedInfiniteQuery";

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
    <div className="flex flex-col gap-24 justify-center items-center">
      <MonthPicker value={currentDate} onChange={handleDate} />

      <Suspense>
        <div ref={parentRef} className="overflow-auto h-[calc(100dvh-150px)] px-4 space-y-6">
          {pages.map((page, i) => (
            <div key={i} className="space-y-6">
              {Object.entries(page.items).map(
                ([date, items]) =>
                  items && <CashHistoryDateBox key={`${date}-${i}`} date={date} dataList={items} />
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
