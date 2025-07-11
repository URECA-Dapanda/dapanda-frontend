import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 outline-none transition-all whitespace-nowrap rounded-2xl font-pretendard body-sm disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-color-primary text-color-text-white hover:bg-color-primary-600 shadow-xs",
        destructive:
          "bg-color-bg-error text-color-text-white hover:bg-red-600 shadow-xs focus-visible:ring-color-bg-error/20 dark:focus-visible:ring-color-bg-error/40",
        outline:
          "border border-color-border-secondary bg-transparent text-color-text-black hover:bg-color-gray-100 dark:bg-color-bg-black/30 dark:hover:bg-color-bg-black/50",
        secondary:
          "bg-color-secondary text-color-text-white hover:bg-color-secondary-600 shadow-xs",
        ghost:
          "bg-transparent hover:bg-color-gray-100 text-color-text-black dark:hover:bg-color-bg-black/40",
        link: "text-color-primary underline underline-offset-4 hover:text-color-primary-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 py-1 rounded-2xl has-[>svg]:px-2.5",
        lg: "h-10 px-6 py-2 rounded-2xl has-[>svg]:px-4",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
