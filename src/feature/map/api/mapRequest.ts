import { MapType } from "../types/mapType";

const mockDataList = () =>
  new Promise<MapType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, () => ({
          id: 1,
          title: "스타벅스 강남역",
          price: "300원",
          address: "서울시 강남구 강남대로 456",
          isOpen: true,
          location: "41.40338, 2.17403",
          score: 4.8,
          type: "와이파이",
        }))
      );
    }, 500);
  });

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export async function getMapList({
  pageParam = 0,
}: {
  pageParam?: number | unknown;
}): Promise<{ items: MapType[]; nextCursor?: number }> {
  console.log("GET API MAP LIST", pageParam);
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };

  const end = pageParam + 20;
  const hasMore = end < 200;
  const data = await mockDataList();
  return { items: data, nextCursor: hasMore ? end : undefined };
}
