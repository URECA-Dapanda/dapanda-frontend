import { ReactNode, Suspense } from "react";

export default function ReviewWriteLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
