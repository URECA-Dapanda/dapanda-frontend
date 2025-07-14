import { MapType } from "../types/mapType";

const mockDataList = () =>
  new Promise<MapType[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "스타벅스 강남역",
          price: "300원",
          address: "서울시 강남구 강남대로 456",
          isOpen: true,
          location: "41.40338, 2.17403",
          score: 4.8,
          type: "와이파이",
        },
        {
          id: 2,
          title: "강남역 2번출구 앞",
          price: "400원",
          address: "서울시 강남구 강남대로 123",
          isOpen: true,
          location: "41.40338, 2.17403",
          score: 4.6,
          type: "핫스팟",
        },
        {
          id: 3,
          title: "강남역 11번출구",
          price: "200원",
          address: "서울시 강남구 강남대로 456",
          isOpen: false,
          location: "41.40338, 2.17403",
          score: 4.8,
          type: "와이파이",
        },
      ]);
    }, 500);
  });

export async function getMapList() {
  const data = await mockDataList();
  return data;
}
