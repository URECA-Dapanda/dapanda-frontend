import { ContentInfoType } from "../types/contentType";

const mockDataList = () =>
  new Promise<ContentInfoType>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 23433,
        price: "2,000원",
        title: "2GB 데이터 판매",
      });
    }, 100);
  });

export async function getChatContentInfo() {
  const data = await mockDataList();
  return data;
}
