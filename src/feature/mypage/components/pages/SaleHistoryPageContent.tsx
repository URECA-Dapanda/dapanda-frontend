import ProfileWithHistoryCard from "../sections/ProfileWithHistoryCard";
import SaleStateTab from "../sections/SaleStateTab";

export default function SaleHistoryPageContent() {
  return (
    <div className="p-24 w-full h-full flex flex-col gap-8">
      <ProfileWithHistoryCard />
      <SaleStateTab />
    </div>
  );
}
