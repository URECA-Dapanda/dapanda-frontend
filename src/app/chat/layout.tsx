"use client";

import { usePathname } from "next/navigation";
import { Fragment, ReactNode } from "react";
import LogoHeader from "@components/common/header/LogoHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isChatRoom = /^\/chat\/[^/]+$/.test(pathname);

  return (
    <Fragment>
      {!isChatRoom && <LogoHeader />}
      {children}
      <BottomNavigation />
    </Fragment>
  );
}
