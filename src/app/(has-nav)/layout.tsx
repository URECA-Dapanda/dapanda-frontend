import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { Fragment } from "react";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <SharedHeader />
      {children}
      <BottomNavigation />
    </Fragment>
  );
}
