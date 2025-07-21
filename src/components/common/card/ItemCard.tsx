import { MouseEventHandler, PropsWithChildren } from "react";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";

interface ItemCardProps {
  handleClick?: MouseEventHandler;
  size?: "sm" | "md" | "lg" | "fit";
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
