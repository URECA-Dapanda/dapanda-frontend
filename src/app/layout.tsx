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
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="flex flex-col min-h-screen w-full">
        <main className="antialiased flex-1 w-[375px] h-[812px] mx-auto overflow-hidden relative">
          <ProviderWrapper>
            <SharedHeader />
            {children}
            <BottomNavigation />
          </ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
