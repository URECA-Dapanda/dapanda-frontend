import { PurchaseHistoryType, SaleHistoryType } from "../types/mypageTypes";
import axios from "@lib/axios";

const mockDataList = (isSold: boolean): Promise<SaleHistoryType[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          title: i + "GB 데이터",
          type: "데이터",
          isSold: isSold,
          registDate: Date.now().toString(),
        }))
      );
    }, 0);
  });

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export async function getPurchaseHistoryList({
  size = 2,
  pageParam,
}: {
  pageParam?: number | unknown;
  size?: number;
}): Promise<{ items: PurchaseHistoryType[]; nextCursor?: number; num?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const { data } = await axios.get("/api/trades/purchase-history", {
    params: { size, cursorId: pageParam === 0 ? undefined : pageParam },
  });
  const items = data.data.trades.data;

  const nextCursor = data.data.trades.pageInfo.nextCursorId;

  return { items, nextCursor, num: data.data.tradeCount };
}

export async function getSaleHistoryList({
  size = 2,
  pageParam,
  productState,
}: {
  pageParam?: number | unknown;
  size?: number;
  productState: string;
}): Promise<{ items: SaleHistoryType[]; nextCursor?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const { data } = await axios.get("/api/selling-product", {
    params: { size, cursorId: pageParam === 0 ? undefined : pageParam, productState },
  });
  const items = data.data.trades.data;

  const nextCursor = data.data.trades.pageInfo.nextCursorId;

  return { items, nextCursor, num: data.data.tradeCount };
}
