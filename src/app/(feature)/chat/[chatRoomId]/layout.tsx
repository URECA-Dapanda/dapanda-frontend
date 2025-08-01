import { ReactNode } from "react";

export default function ChatDetailLayout({ children }: { children: ReactNode }) {
  return <div className="relative h-full w-full overflow-x-hidden bg-white px-24">{children}</div>;
}
