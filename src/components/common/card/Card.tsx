import { PropsWithChildren, useMemo } from "react";
import { Card } from "../../ui/card";
import { cn } from "@lib/utils";

type CardVariant = "material" | "flat" | "outlined";
type CardSize = "large" | "medium" | "small" | number;

interface CardComponentProps {
  variant: CardVariant;
  size: CardSize;
}

export default function CardComponent({
  variant = "material",
  size = "medium",
  children,
}: PropsWithChildren<CardComponentProps>) {
  const calculatedSize = useMemo(() => {
    switch (size) {
      case "large":
        return "150px";
      case "medium":
        return "144px";
      case "small":
        return "120px";
      default:
        return `${size}px`;
    }
  }, [size]);
  const variantStyle = useMemo(() => {
    switch (variant) {
      case "material":
        return "";
      case "flat":
        return "";
      case "outlined":
        return "";
      default:
        return "";
    }
  }, [variant]);
  const height = `h-[${calculatedSize}px]`;

  return (
    <Card
      className={cn("bg-gradient-to-r from-green-400 to-blue-400 text-white", height, variantStyle)}
    >
      {children}
    </Card>
  );
}
