import { RawDataItem } from "@feature/data/types/dataType";

export interface ScrapRecommendationSummary {
totalAmount: number;
totalPrice: number;
}

export interface ScrapRecommendationResponse {
    code: number;
    message: string;
    data: {
        data: RawDataItem[];
        summary: ScrapRecommendationSummary;
    };
}
  