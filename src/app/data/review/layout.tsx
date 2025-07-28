import { ReactNode, Suspense } from "react";

export default function ReviewLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
