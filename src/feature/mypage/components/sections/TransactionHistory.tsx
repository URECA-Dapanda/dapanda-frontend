import { Package2, ShoppingCart } from "lucide-react";
import HistoryButton from "./HistoryButton";

export default function TransactionHistory() {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-20">
      <HistoryButton target="purchase-history">
        <ShoppingCart className="w-16 h-16 mr-8" />
        구매내역
      </HistoryButton>
      <HistoryButton target="sale-history">
        <Package2 className="w-16 h-16 mr-8" />
        판매내역
      </HistoryButton>
    </div>
  );
}
