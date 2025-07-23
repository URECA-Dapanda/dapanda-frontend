import axiosInstance from "@/lib/axios";
import { ContentInfoType } from "../types/chatType";

export const getChatContentInfo = async (chatRoomId: string): Promise<ContentInfoType> => {
  const res = await axiosInstance.get(`/api/chat/${chatRoomId}`);
  return res.data.data;
};
