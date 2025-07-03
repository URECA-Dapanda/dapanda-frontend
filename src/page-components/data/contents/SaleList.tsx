import { SaleItemType } from "@/types/Sale";
import { memo } from "react";
import SaleItem from "./SaleItem";

const dataListings: SaleItemType[] = [
  {
    id: 1,
    seller: "김데이터",
    totalAmount: 2,
    price: 8000,
    pricePer100MB: 4,
    timeAgo: "1시간 전",
    userId: "user1",
  },
  {
    id: 2,
    seller: "박데이터",
    totalAmount: 1.5,
    price: 5400,
    pricePer100MB: 3.6,
    timeAgo: "3시간 전",
    userId: "user2",
  },
  {
    id: 3,
    seller: "이데이터",
    totalAmount: 0.8,
    price: 2800,
    pricePer100MB: 3.5,
    timeAgo: "5시간 전",
    userId: "user3",
  },
];

function SaleList() {
  return (
    <div className="space-y-3">
      {dataListings.map((listing) => (
        <SaleItem key={listing.id} data={listing} />
      ))}
    </div>
  );
}

export default memo(SaleList);
