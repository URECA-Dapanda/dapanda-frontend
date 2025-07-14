"use client";

import { useState } from "react";
import PurchaseTabs from "@/components/common/tabs/PurchaseTabs";
import SalesHistoryTabs from "@/components/common/tabs/SalesHistoryTabs";

export default function Home() {
  const [purchaseMode, setPurchaseMode] = useState("normal");

  return (
    <div className="flex flex-col gap-60 px-24 py-40">
      <section>
        <h2 className="h2 mb-16">📦 구매 탭</h2>
        <PurchaseTabs value={purchaseMode} onChange={setPurchaseMode} />
      </section>

      <section>
        <h2 className="h2 mb-16">🧾 판매내역 탭</h2>
        <SalesHistoryTabs />
      </section>
    </div>
  );
}
