import { PurchaseEnable, RemainData, SellEnable } from "./DataUsageCircles";
import { Suspense } from "react";

export default function DataStateComponent() {
  return (
    <div className="flex flex-row gap-12 justify-between items-center">
      <Suspense>
        <PurchaseEnable />
      </Suspense>
      <Suspense>
        <RemainData />
      </Suspense>
      <Suspense>
        <SellEnable />
      </Suspense>
    </div>
  );
}
