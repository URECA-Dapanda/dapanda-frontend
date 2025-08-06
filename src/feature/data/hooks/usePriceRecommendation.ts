import { getPriceRecommendation } from "@feature/data/api/dataRequest";
import { useQuery } from "@tanstack/react-query";

export const usePriceRecommendation = () => {
  const { data } = useQuery({
    queryFn: getPriceRecommendation,
    queryKey: ["/api/products/market-price"],
  });

  return { recentPrice: data?.recentPrice, averagePrice: data?.averagePrice };
};
