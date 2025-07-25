export interface ReviewRequest {
  tradeId: number;
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  code: number;
  message: string;
  data: {
    reviewId: number;
  };
}
