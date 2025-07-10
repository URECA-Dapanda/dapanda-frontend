import { cn } from "@lib/utils";
import { CardContent } from "@ui/card";
import { PropsWithChildren, useMemo } from "react";

// type CardContentVariant = "columns" | "rows";
type CardContentSize = "large" | "medium" | "small" | number;

interface CardContentProps {
//   variant: CardContentVariant;
  size: CardContentSize;
}

export default function CardContentComponent({
//   variant = "rows",
  size = "medium",
  children,
}: PropsWithChildren<CardContentProps>) {
  const calculatedSize = useMemo(() => {
    switch (size) {
      case "large":
        return 8;
      case "medium":
        return 6;
      case "small":
        return 4;
      default:
        return size;
    }
  }, [size]);
  const padding = `p-${calculatedSize}`;
  return <CardContent className={cn(padding)}>{children}</CardContent>;
}
