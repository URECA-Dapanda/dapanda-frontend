import dayjs from "dayjs";
import {
  CashHistoryType,
  ParsedCashHistoryType,
  PurchaseHistoryType,
  SaleHistoryType,
} from "../types/mypageTypes";
import axios from "@lib/axios";
import "dayjs/locale/ko";

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
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockDataList(isSold);

  return { items: data, nextCursor: hasMore ? end : undefined };
}

export async function getPurchaseHistoryList({
  pageParam = 0,
  size = 2,
  cursorId = 0,
}: {
  pageParam?: number | unknown;
  size?: number;
  cursorId?: number;
}): Promise<{ items: PurchaseHistoryType[]; nextCursor?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const { data } = await axios.get("/api/trades/purchase-history", { params: { size, cursorId } });
  const items = data.trades.data;
  const nextCursor = data.trades.pageInfo.nextCursorId;

  return { items, nextCursor };
}

export async function getUserData() {
  const { data } = await axios.get("");
  return data;
}

export async function getUserCash() {
  const { data } = await axios.get("/api/members/cash");

  return data.data;
}

export async function getCashHistoryList({
  pageParam,
  size = 20,
  year,
  month,
}: {
  pageParam?: number | unknown;
  size?: number;
  year: string;
  month: string;
}) {
  dayjs.locale("ko");
  const { data } = await axios.get("/api/trades/cash-history", {
    params: {
      cursorId: pageParam ? pageParam : undefined,
      size,
      year,
      month,
    },
  });

  const items: ParsedCashHistoryType = Object.groupBy(
    data.data.cashHistorySummary.data,
    (item: CashHistoryType) => {
      return dayjs(item.createdAt).format("D (dd)");
    }
  );
  const nextCursor = data.data.cashHistorySummary.pageInfo.nextCursorId;

  return { items, nextCursor };
}
