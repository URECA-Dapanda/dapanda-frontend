import type { Metadata } from "next";
import ProviderWrapper from "@components/common/ProviderWrapper";
import Script from "next/script";
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
      <body className="flex flex-col min-h-screen w-full">
        <main className="antialiased flex-1 w-[375px] h-[812px] mx-auto overflow-hidden relative">
          <ProviderWrapper>{children}</ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
