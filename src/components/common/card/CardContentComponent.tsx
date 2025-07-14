"use client";

import { PropsWithChildren, useMemo } from "react";
import { CardContent } from "@ui/card";

import { cn } from "@lib/utils";

type CardContentSize = "lg" | "md" | "sm" | number;

interface CardContentProps {
  size: CardContentSize;
}

export default function CardContentComponent({
  size = "md",
  children,
}: PropsWithChildren<Partial<CardContentProps>>) {
  const calculatedSize = useMemo(() => {
    switch (size) {
      case "lg":
        return "p-32";
      case "md":
        return "p-24";
      case "sm":
        return "p-16";
      default:
        return `p-${size}`;
    }
  }, [size]);
  return <CardContent className={cn(calculatedSize, "h-full")}>{children}</CardContent>;
}
