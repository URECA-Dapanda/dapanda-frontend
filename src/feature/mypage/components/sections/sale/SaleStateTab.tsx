"use client";

import { useCallback, useState } from "react";
import { SalesHistoryTabs } from "@components/common/tabs";
import OnSaleTabContent from "@feature/mypage/components/sections/sale/OnSaleTabContent";
import SoldoutTabContent from "@feature/mypage/components/sections/sale/SoldoutTabContent";

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
