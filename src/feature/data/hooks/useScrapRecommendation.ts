import { useState } from "react";
import { getScrapRecommendation } from "@feature/data/api/scrapRecommendation";
import { ScrapRecommendationSummary } from "@feature/data/types/scrapTypes";
import { DataType } from "@feature/data/types/dataType";

export function useScrapRecommendation() {
    const [value, setValue] = useState<number[]>([1]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DataType[]>([]);
    const [summary, setSummary] = useState<ScrapRecommendationSummary>({
        totalAmount: 0,
        totalPrice: 0,
    });

    const search = async () => {
        setLoading(true);
        const { items, summary } = await getScrapRecommendation(value[0]);
        setResult(items);
        setSummary(summary);
        setLoading(false);
    };

    return {
        value,
        setValue,
        loading,
        result,
        summary,
        search,
    };
}
