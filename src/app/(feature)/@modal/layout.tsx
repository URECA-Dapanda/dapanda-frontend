import { ReactNode } from "react";

export default function ModalLayout({ children }: { children: ReactNode }) {
  return <div className="pb-safe-bottom pt-safe-top ">{children}</div>;
}
