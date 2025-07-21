import { ReactNode, Suspense } from "react";

export default function MapDetailLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
