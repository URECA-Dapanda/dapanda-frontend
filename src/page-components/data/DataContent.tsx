import SearchFilter from "@components/common/search/SearchFilter";
import PurchaseSection from "./contents/PurchaseSection";
import SellButton from "./contents/SellButton";
import SaleList from "./contents/SaleList";

export default function DataContent() {
  return (
    <div className="w-[375px] h-[812px] mx-auto bg-gradient-to-b from-[#fefaef] to-white overflow-hidden">
      <div
        className="p-4 pb-20 overflow-y-auto"
        style={{ height: "calc(812px - 120px)" }}
      >
        {/* Search and Filter */}
        <SearchFilter />

        {/* Fragment Purchase Section */}
        <PurchaseSection />

        {/* Sell Button */}
        <SellButton />

        {/* Data Listings - 바로구매 버튼을 우측으로 이동 */}
        <SaleList />
      </div>
    </div>
  );
}
