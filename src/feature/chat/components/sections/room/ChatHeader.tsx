"use client";

import { MoreVertical } from "lucide-react";
import { UserDropdownMenu } from "@/components/common/dropdown/UserDropdownMenu";
import { chatMenuOptions } from "@/components/common/dropdown/dropdownConfig";
import BackButton from "@/components/common/header/BackButton";

interface ChatHeaderProps {
  senderName: string;
  onReport: () => void;
  senderId?: number;
}

export default function ChatHeader({ senderName, onReport, senderId }: ChatHeaderProps) {
  const handleReport = () => {
    onReport();
  };

  return (
    <div className="fixed top-0 z-50 w-[100dvw] lg:w-[375px] mx-auto px-24 bg-white shadow-header">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-8 flex-1 min-w-0">
          <BackButton />
          <h1 className="title-sm font-semibold text-gray-900 truncate">{senderName}</h1>
        </div>

        <div className="flex items-center gap-8">
          <UserDropdownMenu options={chatMenuOptions(handleReport, senderId)}>
            <button className="p-1">
              <MoreVertical className="w-5 h-5" />
            </button>
          </UserDropdownMenu>
        </div>
      </div>
    </div>
  );
}
