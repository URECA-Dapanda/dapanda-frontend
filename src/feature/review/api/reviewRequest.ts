import axios from "@lib/axios";
import type { ReviewRequest, ReviewResponse } from "@feature/review/types/reviewType";

export async function registReview({
  tradeId,
  rating,
  comment,
}: ReviewRequest): Promise<ReviewResponse> {
  const res = await axios.post(`/api/trades/${tradeId}/reviews`, {
    rating,
    comment,
  });
  return res.data;
}
