import { PropsWithChildren } from "react";
import SlidingTabs from "./SlidingTabs";
import { REVIEW_TABS } from "./tabsConfig";

interface Props {
  value: string;
  onChange: (value: string) => void;
  isMine?: boolean;
}

export default function ReviewTabs({
  value,
  onChange,
  isMine,
  children,
}: PropsWithChildren<Props>) {
  const reviewTabs = !!isMine ? REVIEW_TABS.slice(0) : REVIEW_TABS;
  return (
    <SlidingTabs tabs={reviewTabs} value={value} onChange={onChange} variant="outline">
      {children}
    </SlidingTabs>
  );
}
