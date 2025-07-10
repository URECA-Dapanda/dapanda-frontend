import { PropsWithChildren, useMemo } from "react";
import { Card } from "../../ui/card";
import { cn } from "@lib/utils";

type CardVariant = "material" | "flat" | "outlined";
type CardSize = "large" | "medium" | "small" | number;
type CardColor =
  | {
      from: string;
      to: string;
    }
  | string;

interface CardComponentProps {
  variant: CardVariant;
  size: CardSize;
  color: CardColor;
  title?: string;
}

export default function CardComponent({
  variant = "material",
  size = "medium",
  color = "transparent",
  title,
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
  const cardColor = useMemo(() => {
    switch (typeof color) {
      case "object":
        return `bg-gradient-to-r from-${color.from} to-${color.to}`;
      default:
        return `bg-${color}`;
    }
  }, [color]);
  const height = `h-[${calculatedSize}px]`;

  return <Card className={cn(cardColor, height, variantStyle)}>. {children}</Card>;
}
