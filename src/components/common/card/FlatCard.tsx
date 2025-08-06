import { PropsWithChildren } from "react";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";

interface FlatCardProps {
  size: "xl" | "xxl" | "md" | "xs";
  color?: string;
}

export default function FlatCard({ color, size, children }: PropsWithChildren<FlatCardProps>) {
  return (
    <CardComponent
      variant="flat"
      size={size}
      color={`${
        color ??
        (size !== "xxl" && size !== "xl"
          ? "bg-gradient-to-r from-primary-100 to-[#DCE6FF]"
          : "bg-primary2")
      }`}
    >
      <CardContentComponent size={"sm"}>{children}</CardContentComponent>
    </CardComponent>
  );
}
