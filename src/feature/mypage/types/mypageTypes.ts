interface HistoryType {
  id: number;
  type: string;
  registDate?: string;
  soldDate?: string;
  title: string;
  isSold: boolean;
}

export interface SaleHistoryType {
  productId: number;
  type: string;
  state: string;
  dataAmount: number;
  remainAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseHistoryType extends HistoryType {
  tradeId: number;
  tradeType: string;
  dataAmount: number;
  title: string;
  createdAt: string;
}
