"use client";

import { useEffect, useState } from "react";
import NotificationList, { NotificationItem } from "@/feature/notification/components/sections/NotificationList";
import { fetchNotifications, deleteNotification } from "@feature/notification/api/requestNotification";

export default function NotificationPageContent() {
    const [items, setItems] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchNotifications()
            .then((res) => setItems(res))
            .catch((err) => console.error("알림 조회 실패", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = (id: number) => {
        deleteNotification(id).then(() => {
          setItems((prev) => prev.filter((item) => item.id !== id));
        });
      };
      

    return (
        <div className="p-24">
            <h1 className="body-xl mb-20">알림</h1>
            {isLoading ? <p>불러오는 중...</p> : <NotificationList items={items} onDelete={handleDelete} />}
        </div>
    );
}
