import { ReactNode } from "react";
import SharedHeader from "@components/common/header/SharedHeader";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100dvh] w-full overflow-x-hidden bg-white">
      <div className="h-[calc(100dvh-56px)] overflow-y-auto">
        <SharedHeader />
        {children}
      </div>
    </div>
  );
}
