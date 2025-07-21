import ProfileWithHistoryCard from "@feature/mypage/components/sections/profile/ProfileWithHistoryCard";
import SaleStateTab from "@feature/mypage/components/sections/sale/SaleStateTab";

export default function SaleHistoryPageContent() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <ProfileWithHistoryCard />
      <SaleStateTab />
    </div>
  );
}
