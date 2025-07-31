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
  return (
    <div className="fixed top-0 z-50 w-[100dvw] lg:w-[375px] mx-auto px-24 bg-white shadow-sm">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <BackButton />
          <h1 className="body-md font-semibold text-gray-900 truncate">{senderName}</h1>
        </div>

        <div className="flex items-center gap-2">
          <UserDropdownMenu options={chatMenuOptions(onReport, senderId)}>
            <button className="p-2">
              <MoreVertical className="w-5 h-5" />
            </button>
          </UserDropdownMenu>
        </div>
      </div>
    </div>
  );
}
