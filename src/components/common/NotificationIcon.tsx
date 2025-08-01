"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationIcon() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/notification")}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <Bell className="w-20 h-20 text-black hover:text-primary transition-colors duration-200"/>
    </button>
  );
}
