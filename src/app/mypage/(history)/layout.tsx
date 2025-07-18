import { ReactNode, Suspense } from "react";

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
