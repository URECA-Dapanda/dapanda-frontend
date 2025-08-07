import { useEffect, useState } from "react";
import { getWifiPriceRecommendation } from "@feature/map/api/mapRequest";

export const useWifiPriceRecommendation = () => {
  const [recentPrice, setRecentPrice] = useState<number | undefined>(undefined);
  const [avgPrice, setAvgPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getWifiPriceRecommendation();
        if (!res) return;

        setRecentPrice(res.recentPrice);
        setAvgPrice(res.averagePrice);
      } catch (e) {
        console.error("시세 조회 실패", e);
      }
    };

    fetch();
  }, []);

  return { recentPrice, avgPrice };
};
