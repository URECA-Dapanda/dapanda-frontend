import { UserType } from "@type/User";
import { PurchaseHistoryType, SaleHistoryType } from "../types/mypageTypes";
import axios from "@lib/axios";

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
}): Promise<{ items: SaleHistoryType[]; nextCursor?: number; num?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const { data } = await axios.get("/api/selling-products", {
    params: { size, cursorId: pageParam, productState },
  });
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

export async function getMyInfo(): Promise<UserType> {
  const { data } = await axios.get("/api/members/info");

  return data.data;
}
