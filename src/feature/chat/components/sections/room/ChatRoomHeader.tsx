"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, ChevronLeft } from "lucide-react";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { chatMenuOptions } from "@/components/common/dropdown/dropdownConfig";

export default function ChatRoomHeader({
  senderName,
  onReport,
}: {
  senderName: string;
  onReport: () => void;
}) {
  const router = useRouter();

  const handleReport = () => {
    onReport();
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow px-20 py-12 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <button onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="title-sm font-semibold text-gray-900">{senderName}</h1>
      </div>

      <UserDropdownMenu options={chatMenuOptions(handleReport)}>
        <button className="p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </UserDropdownMenu>
    </div>
  );
}
