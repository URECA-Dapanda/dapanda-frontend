import { PurchaseHistoryType, SaleHistoryType } from "../types/mypageTypes";

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

const mockPurchaseList = (): Promise<PurchaseHistoryType[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          title: i + "GB 데이터",
          type: "데이터",
          isSold: true,
          soldDate: Date.now().toString(),
          registDate: Date.now().toString(),
          isScrap: true,
        }))
      );
    }, 0);
  });

export async function getPurchaseHistoryList({
  pageParam = 0,
}: {
  pageParam?: number | unknown;
}): Promise<{ items: PurchaseHistoryType[]; nextCursor?: number }> {
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockPurchaseList();

  return { items: data, nextCursor: hasMore ? end : undefined };
}
