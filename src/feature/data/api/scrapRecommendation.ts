import { ScrapRecommendationSummary } from "@feature/data/types/scrapTypes";
import { mapRawToDataType, DataType, RawDataItem } from "@feature/data/types/dataType";

export async function getScrapRecommendation(
  requestedAmount: number
): Promise<{ items: DataType[]; summary: ScrapRecommendationSummary }> {
  // 더미 데이터
  // 실제 api 연동할때는 주석풀기
//   const response = await axios.post<ScrapRecommendationResponse>(
//     "/api/scrap-data/recommendations",
//     { requestedAmount }
//   );
    if (requestedAmount === 0) {
        return {
        items: [],
        summary: { totalAmount: 0, totalPrice: 0 },
        };
    }
    const dummyData: RawDataItem[] = [
        {
        id: 21,
        price: 1600,
        itemId: 44,
        memberName: "이주희",
        remainAmount: 0.4,
        pricePer100MB: 400,
        splitType: true,
        updatedAt: "3시간전"
        },
        {
        id: 22,
        price: 1200,
        itemId: 45,
        memberName: "김다슬",
        remainAmount: 0.3,
        pricePer100MB: 400,
        splitType: true,
        updatedAt: "5분전"

        },
        {
        id: 23,
        price: 1400,
        itemId: 46,
        memberName: "홍민주",
        remainAmount: 0.3,
        pricePer100MB: 467,
        splitType: true,
        updatedAt: "1시간전"

        },
        {
        id: 24,
        price: 1400,
        itemId: 47,
        memberName: "최윤혁",
        remainAmount: 0.3,
        pricePer100MB: 467,
        splitType: true,
        updatedAt: "1시간전"

        },
    ];

    const summary: ScrapRecommendationSummary = {
        totalAmount: 1.0,
        totalPrice: 4200,
    };

    const items: DataType[] = dummyData.map(mapRawToDataType);

    return { items, summary };
}
