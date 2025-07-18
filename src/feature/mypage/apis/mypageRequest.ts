import { HistoryType } from "../types/mypageTypes";

const mockDataList = (isSold: boolean): Promise<HistoryType[]> =>
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
    }, 100);
  });

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export async function getDataList({
  pageParam = 0,
  isSold = true,
}: {
  pageParam?: number | unknown;
  isSold?: boolean;
}): Promise<{
  items: HistoryType[];
  nextCursor?: number;
}> {
  console.log("GET API DATA LIST", pageParam);
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockDataList(isSold);

  return { items: data, nextCursor: hasMore ? end : undefined };
}
