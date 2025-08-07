import { getBuyingDataAmount, getSellingDataAmount } from "@feature/data/api/dataRequest";
import { useQuery } from "@tanstack/react-query";
import { DataUsageDonut } from "./CicularProgressBar";
import { getMyData } from "@feature/mypage/apis/mypageRequest";

export function PurchaseEnable() {
  const { data: buyingData } = useQuery({
    queryFn: getBuyingDataAmount,
    queryKey: ["api/members/buying-data"],
  });

  return (
    <DataUsageDonut
      data={{
        currentDataAmount: buyingData === undefined ? 0 : Math.round((2 - buyingData) * 10) / 10,
        providingDataAmount: 2,
      }}
      unit="GB"
      color="#C3D4FF"
      bgColor="#DCE6FF"
      title="구매 가능"
    />
  );
}

export function SellEnable() {
  const { data: sellingData } = useQuery({
    queryFn: getSellingDataAmount,
    queryKey: ["api/members/selling-data/sold"],
  });

  return (
    <DataUsageDonut
      data={{
        currentDataAmount: sellingData === undefined ? 0 : Math.round((2 - sellingData) * 10) / 10,
        providingDataAmount: 2,
      }}
      unit="GB"
      color="#C3D4FF"
      bgColor="#DCE6FF"
      title="판매 가능"
    />
  );
}

export function RemainData() {
  const { data: myData } = useQuery({
    queryFn: getMyData,
    queryKey: ["api/plans/my-data"],
  });

  return <DataUsageDonut data={myData} unit="GB" title="잔여 용량" />;
}
