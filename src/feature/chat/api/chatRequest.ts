import { ContentInfoType } from "../types/contentType";

const mockDataList = (chatId: string): Promise<ContentInfoType> =>
  new Promise<ContentInfoType>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 23433,
        price: "2,000원",
        title: `2GB 데이터 판매 - ${chatId}`,
      });
    }, 100);
  });

export async function getChatContentInfo(chatId: string): Promise<ContentInfoType> {
  const data = await mockDataList(chatId);
  return data;
}
