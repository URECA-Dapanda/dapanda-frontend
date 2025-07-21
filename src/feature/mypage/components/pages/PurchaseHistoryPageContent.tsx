import PurchaseHistoryList from "../sections/purchase/PurchaseHistoryList";
import TabTitle from "../sections/TabTitle";

export default function PurchaseHistoryPageContent() {
  return (
    <div className="p-24 w-full h-full flex flex-col gap-8">
      <TabTitle listLength={13}></TabTitle>
      <PurchaseHistoryList />
    </div>
  );
}
