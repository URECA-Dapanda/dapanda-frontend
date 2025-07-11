import { DataType } from "../types/dataType";

const mockDataList = () =>
  new Promise<DataType[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 123,
          date: "3시간전",
          title: "2GB",
          price: "8,000원",
          pricePer: "400원/100MB",
          userId: 123,
          userName: "김데이터",
        },
        {
          id: 124,
          date: "5시간전",
          title: "2GB",
          price: "8,000원",
          pricePer: "400원/100MB",
          userId: 123,
          userName: "김데이터",
        },
        {
          id: 125,
          date: "7시간전",
          title: "2GB",
          price: "8,000원",
          pricePer: "400원/100MB",
          userId: 123,
          userName: "김데이터",
        },
      ]),
        100;
    });
  });

export async function getDataList() {
  const data = await mockDataList();
  return data;
}
