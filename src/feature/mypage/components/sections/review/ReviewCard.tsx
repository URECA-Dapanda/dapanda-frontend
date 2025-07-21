"use client";

import { useCallback, useState } from "react";
import ReviewTabs from "@components/common/tabs/ReviewTabs";
import ReviewList from "./ReviewList";
import SellingList from "./SellingList";

interface ReviewCardProps {
  isMine?: boolean;
}

export default function ReviewCard({ isMine = false }: ReviewCardProps) {
  const [currentTab, setCurrentTab] = useState<string>("selling");

  const handleChangeTab = useCallback((newValue: string) => {
    setCurrentTab(newValue);
  }, []);
  return (
    <ReviewTabs value={currentTab} onChange={handleChangeTab} isMine={isMine}>
      <ReviewList />
      <SellingList />
    </ReviewTabs>
  );
}
