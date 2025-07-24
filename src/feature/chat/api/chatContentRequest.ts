import axiosInstance from "@/lib/axios";
import { ContentInfoType } from "@/feature/chat/types/chatType";

export const getChatContentInfo = async (chatRoomId: number): Promise<ContentInfoType> => {
  const res = await axiosInstance.get(`/api/chat/${chatRoomId}`);
  if (res.data.code !== 0) throw new Error(res.data.message);
  return res.data.data;
};
