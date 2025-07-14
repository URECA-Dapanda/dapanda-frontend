import type { Metadata } from "next";
import ProviderWrapper from "@components/common/ProviderWrapper";
import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import "./globals.css";

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
      <body className={`antialiased w-[375px] h-[812px] mx-auto overflow-hidden relative`}>
        <ProviderWrapper>
          <SharedHeader />
          {children}
          <BottomNavigation />
        </ProviderWrapper>
      </body>
    </html>
  );
}
