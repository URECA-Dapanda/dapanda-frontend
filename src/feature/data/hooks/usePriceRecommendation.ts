import { useEffect, useState } from "react";
import { getPriceRecommendation } from "@feature/data/api/dataRequest";

export const usePriceRecommendation = () => {
  const [recentPrice, setRecentPrice] = useState<number | null>(null);
  const [avgPrice, setAvgPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPriceRecommendation();
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
