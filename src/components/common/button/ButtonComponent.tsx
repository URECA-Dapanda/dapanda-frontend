import { Button } from "@ui/button";
import { buttonVariants } from "./buttonVariants";
import type { ButtonProps } from "./button.types";

import { cn } from "@/lib/utils";

export function ButtonComponent({
  className,
  variant,
  size,
  color,
  isActive,
  ...props
}: ButtonProps) {
  const activeClass = variant === "toggle" && isActive ? "bg-primary2" : "";

  return (
    <Button
      className={cn(color, buttonVariants({ variant, size }), activeClass, className)}
      {...props}
    />
  );
}
