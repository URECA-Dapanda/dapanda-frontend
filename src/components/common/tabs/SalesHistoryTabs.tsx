import { PropsWithChildren } from "react";
import SlidingTabs from "@/components/common/tabs/SlidingTabs";
import { SALES_HISTORY_TABS } from "@/components/common/tabs/tabsConfig";
import { TabProps } from "@type/CommonComponent";

export default function SalesHistoryTabs({
  value,
  onChange,
  children,
}: PropsWithChildren<TabProps>) {
  return (
    <SlidingTabs tabs={SALES_HISTORY_TABS} value={value} onChange={onChange} variant="outline">
      {children}
    </SlidingTabs>
  );
}
