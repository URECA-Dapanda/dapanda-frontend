import axios from "@/lib/axios";

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    createdAt: string;
  }
  
  export const fetchNotifications = async (): Promise<NotificationItem[]> => {
    const res = await axios.get("/api/notifications");
    return res.data.data;
  };
  
  export const deleteNotification = async (id: string) => {
    await axios.delete(`/api/notifications/${id}`);
  };