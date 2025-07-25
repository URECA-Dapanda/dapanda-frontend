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
  classification: string;
  createdAt: string;
}

export interface ParsedCashHistoryType {
  [key: string]: CashHistoryType[] | undefined;
}

export interface MonthlyCashTotalType {
  totalPurchase: number;
  totalSelling: number;
  totalCharge: number;
  totalRefund: number;
  total: number;
}
