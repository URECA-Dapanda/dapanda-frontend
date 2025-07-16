import type { Metadata } from "next";
import ProviderWrapper from "@components/common/ProviderWrapper";
import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "DaPanDa",
  description: "URECA final project DaPanDa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen w-full">
        <main className="antialiased flex-1 w-[375px] h-[812px] mx-auto overflow-hidden relative">
          <ProviderWrapper>
            {/* 네이버 지도 API 스크립트 삽입 */}
            <Script
              strategy="beforeInteractive"
              src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
            />
            <SharedHeader />
            {children}
            <BottomNavigation />
          </ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
