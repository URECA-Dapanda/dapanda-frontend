import CardComponent from "./CardComponent";
import CardContentComponent from "./CardContentComponent";
import { MouseEventHandler, PropsWithChildren } from "react";

interface ItemCardProps {
  handleClick?: MouseEventHandler;
  size?: "sm" | "md" | "lg";
}

export default function ItemCard({
  handleClick,
  size = "sm",
  children,
}: PropsWithChildren<ItemCardProps>) {
  return (
    <div onClick={handleClick} className={`${handleClick ? "hover:cursor-pointer" : ""}`}>
      <CardComponent variant="material" size={size}>
        <CardContentComponent size={"sm"}>{children}</CardContentComponent>
      </CardComponent>
    </div>
  );
}
