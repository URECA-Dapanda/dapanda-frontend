"use client";

import { useState } from "react";
import PurchaseTabs from "@/components/common/tabs/PurchaseTabs";

export default function Home() {
  const [purchaseMode, setPurchaseMode] = useState("normal");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <PurchaseTabs value={purchaseMode} onChange={setPurchaseMode} />
    </div>
  );
}
