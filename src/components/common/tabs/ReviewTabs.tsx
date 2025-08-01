"use client";

import { useSearchParams } from "next/navigation";
import { Children, PropsWithChildren } from "react";
import SlidingTabs from "@components/common/tabs/SlidingTabs";
import { REVIEW_TABS } from "@components/common/tabs/tabsConfig";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReviewTabs({ value, onChange, children }: PropsWithChildren<Props>) {
  const searchParams = useSearchParams();
  const isMine = searchParams.get("isMine");
  const reviewTabs = isMine === "true" ? REVIEW_TABS.slice(0, 2) : REVIEW_TABS.slice(1);
  const tabs =
    isMine === "true"
      ? Children.toArray(children).slice(0, 2)
      : Children.toArray(children).slice(1);

  return (
    <SlidingTabs tabs={reviewTabs} value={value} onChange={onChange} variant="outline">
      {tabs}
    </SlidingTabs>
  );
}
