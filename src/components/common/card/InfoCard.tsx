import { MouseEventHandler, PropsWithChildren } from "react";
import CardComponent from "./CardComponent";
import CardContentComponent from "./CardContentComponent";

interface ItemCardProps {
  handleClick?: MouseEventHandler;
}

export default function InfoCard({ handleClick, children }: PropsWithChildren<ItemCardProps>) {
  return (
    <div onClick={handleClick} className={`${handleClick ? "hover:cursor-pointer" : ""}`}>
      <CardComponent variant="outlined" size="xs" color={"border-bg-primary"}>
        <CardContentComponent size={"sm"}>{children}</CardContentComponent>
      </CardComponent>
    </div>
  );
}
