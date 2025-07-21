import { MapType } from "@/feature/map/types/mapType";

const mockDataList = (startId = 0) =>
  new Promise<MapType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, i) => ({
          id: startId + i + 1,
          productId: startId + i + 1,
          title: `스타벅스 강남역 ${i + 1}`,
          price: 300,
          address: "서울시 강남구 강남대로 456",
          isOpen: true,
          location: "41.40338, 2.17403",
          score: 4.8,
          type: "와이파이",
          updatedAt: "3시간 전",
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
