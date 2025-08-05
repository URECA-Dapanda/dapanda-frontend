"use client";

import { MapPin, MessageCircle, User, Wifi } from "lucide-react";
import { Fragment, PropsWithChildren } from "react";
import NavigationButton from "@components/common/navigation/NavigationButton";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";
import { useChatStore } from "@feature/chat/stores/useChatStore";

interface BottomNavigationProps {
  id?: string;
}

export default function BottomNavigation({ id }: PropsWithChildren<BottomNavigationProps>) {
  const path = usePathname();
  const isHidden = path.startsWith("/chat") && path.split("/").length > 2;
  const chatList = useChatStore((state) => state.chatList);
  const totalUnreadCount = chatList.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);
  return (
    <div
      id={id}
      className={cn(
        "fixed bottom-0 h-[54px] z-101 w-[100dvw] lg:w-[600px] mx-auto shadow-nav shrink-0 bg-white",
        isHidden && "hidden"
      )}
    >
      <div className="grid grid-cols-4 px-8 shadow-nav">
        <NavigationButton target={"/data"}>
          <Fragment>
            <Wifi className="w-20 h-20 mb-4" />
            <span className="body-xs font-medium">데이터</span>
          </Fragment>
        </NavigationButton>
        <NavigationButton target={"/map"}>
          <Fragment>
            <MapPin className="w-5 h-5 mb-1" />
            <span className="body-xs">위치기반</span>
          </Fragment>
        </NavigationButton>
        <NavigationButton target={"/chat"}>
          <div className="relative">
            <MessageCircle className="w-5 h-5 mb-1" />
            {totalUnreadCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[5px] h-[14px] px-1 flex items-center justify-center rounded-full bg-primary text-white caption-sm font-bold border border-white">
                {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
              </span>
            )}
          </div>
          <span className="body-xs">채팅</span>
        </NavigationButton>
        <NavigationButton target={"/mypage"}>
          <Fragment>
            <User className="w-5 h-5 mb-1" />
            <span className="body-xs">마이</span>
          </Fragment>
        </NavigationButton>
      </div>
    </div>
  );
}
