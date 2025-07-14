import SlidingTabs from "@/components/common/tabs/SlidingTabs";
import { PURCHASE_MODE_TABS } from "@/components/common/tabs/tabsConfig";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PurchaseModeTabs({ value, onChange }: Props) {
  return (
    <SlidingTabs
      tabs={PURCHASE_MODE_TABS}
      value={value}
      onChange={onChange}
      variant="pill"
      delay={150}
    />
  );
}
