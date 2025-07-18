import { DataType } from "../types/dataType";

const mockDataList = (num: number): Promise<DataType[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, i) => ({
          id: num + i,
          date: "3시간전",
          title: `2GB ${num + i}`,
          price: "8,000원",
          pricePer: "400원/100MB",
          userId: 123,
          userName: "김데이터",
        }))
      );
    }, 0);
  });

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export async function getDataList({ pageParam = 0 }: { pageParam?: number | unknown }): Promise<{
  items: DataType[];
  nextCursor?: number;
}> {
  console.log("GET API DATA LIST", pageParam);
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };
  const start = pageParam;
  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockDataList(start);

  return { items: data, nextCursor: hasMore ? end : undefined };
}
