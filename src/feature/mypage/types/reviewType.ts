export interface ReviewType {
  reviewId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewerId: number;
  reviewerName?: string;
  revieweeName?: string;
  tradeId: number;
  dataAmount: number;
  productId: number;
  itemType: string;
}
