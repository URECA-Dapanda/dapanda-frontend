import { ReactNode } from "react";

export default function ChatDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full overflow-x-hidden bg-white px-24"
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
