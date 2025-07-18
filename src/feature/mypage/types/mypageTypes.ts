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
  soldDate: string;
  isScrap: boolean;
}
