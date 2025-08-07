import { PropsWithChildren } from "react";
import SlidingTabs from "@/components/common/tabs/SlidingTabs";
import { PURCHASE_MODE_TABS } from "@/components/common/tabs/tabsConfig";
import { TabProps } from "@type/CommonComponent";

export default function PurchaseModeTabs({ value, onChange, children }: PropsWithChildren<TabProps>) {
  return (
    <SlidingTabs
      tabs={PURCHASE_MODE_TABS}
      value={value}
      onChange={onChange}
      variant="pill"
      delay={150}
    >
      {children}
    </SlidingTabs>
  );
}
