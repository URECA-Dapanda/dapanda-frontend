import axios from "@/lib/axios";

export interface NotificationItem {
    id: number;
    title: string;
    body: string;
    createdAt: string;
  }
  
  export const fetchNotifications = async (): Promise<NotificationItem[]> => {
    const res = await axios.get("/api/notifications");
    return res.data.data;
  };
  
  export const deleteNotification = async (id: number) => {
    await axios.delete(`/api/notifications/${id}`);
  };