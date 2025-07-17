"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, ChevronLeft } from "lucide-react";

export default function ChatRoomHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white shadow px-4 py-3 flex items-center justify-between">
      <div className="flex item-center gap-2">
        <button onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="title-sm font-semibold text-gray-900">{title}</h1>
      </div>

      <button className="p-1">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
}
