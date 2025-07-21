import PurchaseHistoryList from "@feature/mypage/components/sections/purchase/PurchaseHistoryList";
import TabTitle from "@feature/mypage/components/sections/TabTitle";

export default function PurchaseHistoryPageContent() {
  return (
    <div className="p-24 w-full h-full flex flex-col gap-8">
      <TabTitle listLength={13}></TabTitle>
      <PurchaseHistoryList />
    </div>
  );
}
