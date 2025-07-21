import { Fragment, ReactNode } from "react";
import LogoHeader from "@components/common/header/LogoHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <LogoHeader />
      {children}
      <BottomNavigation />
    </Fragment>
  );
}
