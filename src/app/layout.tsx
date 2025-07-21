import type { Metadata } from "next";
import ProviderWrapper from "@components/common/ProviderWrapper";
import "./globals.css";

import ConditionalBottomNav from "@components/common/navigation/ConditionalBottomNav";

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
            {children}
            <ConditionalBottomNav />
          </ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
