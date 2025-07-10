import type { VariantProps } from "class-variance-authority";
import type React from "react";
import { buttonVariants } from "./buttonVariants";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
