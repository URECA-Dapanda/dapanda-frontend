"use client";

import { useCallback, useState } from "react";
import ReviewTabs from "@components/common/tabs/ReviewTabs";
import ReviewList from "@feature/mypage/components/sections/review/ReviewList";
import SellingList from "@feature/mypage/components/sections/review/SellingList";

export default function ReviewCard() {
  const [currentTab, setCurrentTab] = useState<string>("selling");

  const handleChangeTab = useCallback((newValue: string) => {
    setCurrentTab(newValue);
  }, []);
  return (
    <ReviewTabs value={currentTab} onChange={handleChangeTab}>
      <ReviewList />
      <SellingList />
    </ReviewTabs>
  );
}
