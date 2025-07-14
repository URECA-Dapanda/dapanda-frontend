import SlidingTabs from "@/components/common/tabs/SlidingTabs";
import { SALES_HISTORY_TABS } from "@/components/common/tabs/tabsConfig";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SalesHistoryTabs({ value, onChange }: Props) {
  return (
    <SlidingTabs tabs={SALES_HISTORY_TABS} value={value} onChange={onChange} variant="outline" />
  );
}
