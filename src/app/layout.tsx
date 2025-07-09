import type { Metadata } from "next";
import "./globals.css";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import SharedHeader from "@/components/common/header/SharedHeader";
import ProviderWrapper from "@components/common/ProviderWrapper";

export const metadata: Metadata = {
  title: "DaPanDa",
  description: "Please Input Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`antialiased w-[375px] h-[812px] mx-auto overflow-hidden`}
      >
        <ProviderWrapper>
          <SharedHeader />
          {children}
          <BottomNavigation />
        </ProviderWrapper>
      </body>
    </html>
  );
}
