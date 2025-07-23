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

export async function getSaleHistoryList({
  pageParam = 0,
  isSold = true,
}: {
  pageParam?: number | unknown;
  isSold?: boolean;
}): Promise<{
  items: SaleHistoryType[];
  nextCursor?: number;
}> {
  console.log("GET API DATA LIST", pageParam);
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockDataList(isSold);

  return { items: data, nextCursor: hasMore ? end : undefined };
}

export async function getPurchaseHistoryList({
  size = 2,
  pageParam,
}: {
  pageParam?: number | unknown;
  size?: number;
  cursorId?: number;
}): Promise<{ items: PurchaseHistoryType[]; nextCursor?: number; num?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const { data } = await axios.get("/api/trades/purchase-history", {
    params: { size, cursorId: pageParam === 0 ? undefined : pageParam },
  });
  const items = data.data.trades.data;

  const nextCursor = data.data.trades.pageInfo.nextCursorId;

  return { items, nextCursor, num: data.data.tradeCount };
}
