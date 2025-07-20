"use client";

import { Fragment, ReactNode } from "react";
import LogoHeader from "@components/common/header/LogoHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { usePathname } from "next/navigation";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChatRoom = pathname.startsWith("/chat/");

  return (
    <Fragment>
      <LogoHeader />
      {children}
      {!isChatRoom && <BottomNavigation />}
    </Fragment>
  );
}
