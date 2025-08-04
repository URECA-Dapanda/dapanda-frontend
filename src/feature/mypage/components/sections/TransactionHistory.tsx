import { Package2, ShoppingCart } from "lucide-react";
import HistoryButton from "./HistoryButton";

export default function TransactionHistory() {
  return (
    <div className="flex flex-col items-center justify-between w-full gap-12">
      <HistoryButton target="cash-history">
        <Package2 className="w-16 h-16 mr-8" />
        거래내역
      </HistoryButton>
      <HistoryButton target="purchase-history">
        <ShoppingCart className="w-16 h-16 mr-8" />
        구매목록
      </HistoryButton>
      <HistoryButton target="sale-history">
        <Package2 className="w-16 h-16 mr-8" />
        판매목록
      </HistoryButton>
    </div>
  );
}
