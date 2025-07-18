"use client";

import { SalesHistoryTabs } from "@components/common/tabs";
import { useCallback, useState } from "react";
import OnSaleTabContent from "./sale/OnSaleTabContent";
import SoldoutTabContent from "./sale/SoldoutTabContent";

export default function SaleStateTab() {
  const [currentTab, setCurrentTab] = useState<string>("selling");

  const handleChangeTab = useCallback((newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <SalesHistoryTabs value={currentTab} onChange={handleChangeTab}>
      <OnSaleTabContent />
      <SoldoutTabContent />
    </SalesHistoryTabs>
  );
}
