"use client";

import { useCallback, useState } from "react";
import ReviewTabs from "@components/common/tabs/ReviewTabs";
import ReviewList from "@feature/mypage/components/sections/review/ReviewList";
import OnSaleTabContent from "@feature/mypage/components/sections/sale/OnSaleTabContent";

export default function ReviewCard() {
  const [currentTab, setCurrentTab] = useState<string>("review");

  const handleChangeTab = useCallback((newValue: string) => {
    setCurrentTab(newValue);
  }, []);
  return (
    <ReviewTabs value={currentTab} onChange={handleChangeTab}>
      <ReviewList type={"post"} />
      <ReviewList type={"receive"} />
      <OnSaleTabContent />
    </ReviewTabs>
  );
}
