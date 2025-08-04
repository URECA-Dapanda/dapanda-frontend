"use client";

import NotificationCard from "./NotificationCard";
import { BellOff } from "lucide-react";

export interface NotificationItem {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

interface NotificationListProps {
  items?: NotificationItem[];
  onDelete: (id: number) => void;
}

export default function NotificationList({ items, onDelete }: NotificationListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="pt-safe-top pb-safe-bottom h-main-safe flex flex-col items-center justify-center text-gray-500">
        <BellOff className="w-24 h-24 mb-20" />
        <p className="body-md">받은 알림이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-12 py-12 px-12">
      {items.map((item) => (
        <NotificationCard key={item.id} {...item} onDelete={onDelete} />
      ))}
    </ul>
  );
}
