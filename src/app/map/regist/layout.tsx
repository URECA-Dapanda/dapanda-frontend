import { ReactNode, Suspense } from "react";

export default function MapRegisterLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
