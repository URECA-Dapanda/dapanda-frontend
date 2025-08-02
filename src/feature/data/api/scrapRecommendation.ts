import axios from "@lib/axios";
import { ScrapRecommendationSummary } from "@feature/data/types/scrapTypes";
import { RawDataItem } from "@feature/data/types/dataType";

export async function getScrapRecommendation(
  requestedAmount: number
): Promise<{ items: RawDataItem[]; summary: ScrapRecommendationSummary }> {
  try {
    const response = await axios.get("/api/trades/mobile-data/scrap", {
      params: { dataAmount: requestedAmount },
    });

    const rawItems: RawDataItem[] = response.data.data.combinations;
    const summary: ScrapRecommendationSummary = {
      totalAmount: response.data.data.totalAmount,
      totalPrice: response.data.data.totalPrice,
    };

    return { items: rawItems, summary };
  } catch (error) {
    console.error("자투리 조합 조회 실패", error);
    return {
      items: [],
      summary: { totalAmount: 0, totalPrice: 0 },
    };
  }
}
