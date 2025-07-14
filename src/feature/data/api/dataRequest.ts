import { DataType } from "../types/dataType";

const mockDataList = (num: number) =>
  new Promise<DataType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, i) => {
          return {
            id: i,
            date: "3시간전",
            title: "2GB " + (num + i),
            price: "8,000원",
            pricePer: "400원/100MB",
            userId: 123,
            userName: "김데이터",
          };
        })
      );
    }, 100);
  });

export async function getDataList({
  pageParam = 0,
}): Promise<{ items: DataType[]; nextCursor?: number }> {
  console.log("GET API DATA LIST", pageParam);
  const start = pageParam;
  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockDataList(start);

  return { items: data, nextCursor: hasMore ? end : undefined };
}
