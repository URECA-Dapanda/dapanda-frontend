"use client";

import { usePathname } from "next/navigation";
import BottomNavigation from "@components/common/navigation/BottomNavigation";

export default function ConditionalBottomNav() {
  const pathname = usePathname();

  // 채팅 상세 페이지에서는 BottomNavigation 숨김
  const shouldHide = pathname.startsWith("/chat/") && pathname.split("/").length === 3;

  if (shouldHide) return null;

  return <BottomNavigation />;
}
