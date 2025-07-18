import SlidingTabs from "@/components/common/tabs/SlidingTabs";
import { PURCHASE_MODE_TABS } from "@/components/common/tabs/tabsConfig";
import { PropsWithChildren } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PurchaseModeTabs({ value, onChange, children }: PropsWithChildren<Props>) {
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
