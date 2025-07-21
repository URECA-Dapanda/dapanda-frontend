import SharedHeader from "@components/common/header/SharedHeader";
import { ReactNode, Suspense } from "react";

export default function ReviewLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <SharedHeader />
      {children}
    </Suspense>
  );
}
