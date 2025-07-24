interface HistoryType {
  id: number;
  type: string;
  registDate?: string;
  soldDate?: string;
  title: string;
  isSold: boolean;
}

export interface SaleHistoryType extends HistoryType {
  registDate: string;
}

export interface PurchaseHistoryType extends HistoryType {
  tradeId: number;
  tradeType: string;
  dataAmount: number;
  title: string;
  createdAt: string;
}

export interface CashHistoryType {
  tradeId: number;
  tradeType: string;
  price: number;
  description: string;
  createdAt: string;
}
