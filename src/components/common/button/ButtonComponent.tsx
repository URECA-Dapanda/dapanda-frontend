import { Button } from "@ui/button";
import { buttonVariants } from "./buttonVariants";
import type { ButtonProps } from "./button.types";

import { cn } from "@/lib/utils";

export function ButtonComponent({ className, variant, size, color, ...props }: ButtonProps) {
  return <Button className={cn(color, buttonVariants({ variant, size }), className)} {...props} />;
}
