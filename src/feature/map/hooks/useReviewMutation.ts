import { useMutation } from "@tanstack/react-query";
import { registReview } from "../api/reviewRequest";
import { ReviewRequest, ReviewResponse } from "../types/reviewType";
import { AxiosError } from "axios";

export function useReviewMutation(onSuccess?: () => void, onError?: (e: AxiosError) => void) {
  return useMutation<ReviewResponse, AxiosError, ReviewRequest>({
    mutationFn: ({ tradeId, rating, comment }) => registReview({ tradeId, rating, comment }),
    onSuccess,
    onError,
  });
}
