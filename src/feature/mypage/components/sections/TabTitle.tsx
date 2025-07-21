import { BadgeComponent } from "@components/common/badge";
import { PropsWithChildren } from "react";

interface TabTitleProps {
  listLength: number;
}
export default function TabTitle({ listLength, children }: PropsWithChildren<TabTitleProps>) {
  return (
    <div className="flex flex-row justify-between px-24 my-4">
      <p className="title-md">{children}</p>
      <BadgeComponent variant={"count"}>{listLength} 개</BadgeComponent>
    </div>
  );
}
