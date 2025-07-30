import { useQuery } from "@tanstack/react-query";
import { getSellingDataAmount, getBuyingDataAmount } from "@feature/data/api/dataRequest";
import { MAX_MONTHLY_DATA_LIMIT_GB } from "@feature/data/constants/dataLimit";

export const useMonthlyDataLimit = () => {
    const buyingQuery = useQuery({
      queryKey: ["monthlyBuyingAmount"],
      queryFn: getBuyingDataAmount,
    });
  
    const sellingQuery = useQuery({
      queryKey: ["monthlySellingAmount"],
      queryFn: getSellingDataAmount,
    });
  
    const remainingBuying = buyingQuery.data !== undefined
      ? Math.max(0, Math.round((MAX_MONTHLY_DATA_LIMIT_GB - buyingQuery.data) * 10) / 10)
      : undefined;
  
    const remainingSelling = sellingQuery.data !== undefined
      ? Math.max(0, Math.round((MAX_MONTHLY_DATA_LIMIT_GB - sellingQuery.data) * 10) / 10)
      : undefined;
  
    return {
      isLoading: buyingQuery.isLoading || sellingQuery.isLoading,
      remainingBuying,
      remainingSelling,
    };
  };
  
