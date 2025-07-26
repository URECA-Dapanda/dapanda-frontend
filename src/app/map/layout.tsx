"use client";

import { ReactNode } from "react";
import Script from "next/script";
import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { usePathname } from "next/navigation";

export default function MapLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeaderAndTab = pathname.startsWith("/map/review");

  return (
    <>
      {!hideHeaderAndTab && (
        <header className="fixed top-0 left-0 right-0 z-50">
          <SharedHeader />
        </header>
      )}
      <main className={!hideHeaderAndTab ? "pt-[56px] pb-[56px]" : ""}>
        <Script
          strategy="afterInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        />
        {children}
      </main>
      {!hideHeaderAndTab && <BottomNavigation />}
    </>
  );
}
