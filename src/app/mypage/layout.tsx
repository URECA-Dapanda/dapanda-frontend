import SharedHeader from "@components/common/header/SharedHeader";
import { ReactNode } from "react";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100dvh] w-full">
      <SharedHeader />
      <main className="flex-1 w-full max-w-4xl p-6">{children}</main>
    </div>
  );
}
