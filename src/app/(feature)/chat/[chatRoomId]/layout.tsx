import { ReactNode } from "react";

export default function ChatDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-main-safe pt-safe-top pb-safe-bottom w-full overflow-x-hidden bg-white px-24">
      {children}
    </div>
  );
}
