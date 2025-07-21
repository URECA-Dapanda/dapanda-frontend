import ProfileWithHistoryCard from "../sections/profile/ProfileWithHistoryCard";
import SaleStateTab from "../sections/sale/SaleStateTab";

export default function SaleHistoryPageContent() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <ProfileWithHistoryCard />
      <SaleStateTab />
    </div>
  );
}
