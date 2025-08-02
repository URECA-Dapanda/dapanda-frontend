import { ReactNode } from "react";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-main-safe pt-safe-top pb-safe-bottom w-full lg:w-[600px] overflow-x-hidden bg-white overflow-y-auto">
      {children}
    </div>
  );
}
