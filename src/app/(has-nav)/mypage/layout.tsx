import { ReactNode } from "react";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100dvh] w-full">
      <main className="flex-1 w-full max-w-4xl p-6">{children}</main>
    </div>
  );
}
