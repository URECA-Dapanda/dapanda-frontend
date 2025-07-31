import { UserType } from "@type/User";
import dayjs from "dayjs";
import {
  CashHistoryType,
  MonthlyCashTotalType,
  ParsedCashHistoryType,
  PurchaseHistoryType,
  SaleHistoryType,
} from "../types/mypageTypes";
import axios from "@lib/axios";
import "dayjs/locale/ko";

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
  id,
}: {
  pageParam?: number | unknown;
  size?: number;
  productState: string;
  id?: string;
}): Promise<{ items: SaleHistoryType[]; nextCursor?: number; num?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const { data } = await axios.get(
    id ? `/api/members/${id}/selling-products` : "/api/selling-products",
    {
      params: { size, cursorId: pageParam, productState },
    }
  );
  const items = data.data.data;

  const nextCursor = data.data.pageInfo.nextCursorId;

  return { items, nextCursor, num: data.data.count };
}

export async function getUserData() {
  const { data } = await axios.get("");
  return data;
}

export async function getUserCash() {
  const { data } = await axios.get("/api/members/cash");

  return data.data;
}

export async function getMyData() {
  const { data } = await axios.get("api/plans/my-data");

  return data.data;
}

export async function getMyInfo(id?: string | number): Promise<UserType> {
  console.log("id", id);
  const { data } = await axios.get("/api/members/info", { params: { memberId: id } });

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

  const info: MonthlyCashTotalType = data.data.cashHistoryMonthlySummary;
  const nextCursor = data.data.cashHistorySummary.pageInfo.nextCursorId;

  return { items, nextCursor, monthlyInfo: info };
}

export async function updateProfileImage(imageUrl: string) {
  const { data } = await axios.post("/api/members/profile-image", {
    imageUrl,
  });

  return data;
}
