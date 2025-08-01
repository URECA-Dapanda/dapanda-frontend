"use client";

import { MapPin, MessageCircle, User, Wifi } from "lucide-react";
import { Fragment, PropsWithChildren } from "react";
import NavigationButton from "@components/common/navigation/NavigationButton";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";

interface BottomNavigationProps {
  id?: string;
}

export default function BottomNavigation({ id }: PropsWithChildren<BottomNavigationProps>) {
  const path = usePathname();
  const isHidden = path.startsWith("/chat") && path.split("/").length > 2;
  return (
    <div
      id={id}
      className={cn(
        "fixed bottom-0 h-[54px] z-101 w-[100dvw] lg:w-[375px] mx-auto shadow-nav shrink-0 bg-white",
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
          <MessageCircle className="w-5 h-5 mb-1" />
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
