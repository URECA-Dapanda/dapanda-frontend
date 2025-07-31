"use client";

import { useEffect, useState } from "react";
import NotificationList, { NotificationItem } from "@/feature/notification/components/sections/NotificationList";
import { fetchNotifications, deleteNotification } from "@feature/notification/api/requestNotification";

export default function NotificationPageContent() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: 서버 연동 예정
    // fetchNotifications().then((res) => {
    //   setItems(res);
    //   setIsLoading(false);
    // });
    const mock: NotificationItem[] = [
      {
        id: "1",
        title: "핫스팟 예약 완료",
        message: "7월 30일 13:00 핫스팟 예약이 완료되었습니다.",
        createdAt: "2025-07-30 11:00",
      },
      {
        id: "2",
        title: "이용 종료 알림",
        message: "7월 30일 13:00 이용이 종료되었습니다.",
        createdAt: "2025-07-30 13:01",
      },
      {
        id: "3",
        title: "와이파이 구매완료 알림",
        message: "7월 30일 13:00 핫스팟 예약이 완료되었습니다.",
        createdAt: "2025-07-30 18:30",
      },
      {
        id: "4",
        title: "데이터 판매완료 알림",
        message: "데이터 1.5GB가 판매되었습니다",
        createdAt: "2025-07-30 20:20",
      },
    ];
    setTimeout(() => {
      setItems(mock);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleDelete = (id: string) => {
    // TODO: 서버 연동 예정
    // deleteNotification(id).then(() => {
    //   setItems((prev) => prev.filter((item) => item.id !== id));
    // });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-24">
      <h1 className="body-xl mb-20">알림</h1>
      {isLoading ? <p>불러오는 중...</p> : <NotificationList items={items} onDelete={handleDelete} />}
    </div>
  );
}
