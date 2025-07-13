import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 outline-none transition-all whitespace-nowrap rounded-20 font-pretendard body-sm disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-600 shadow-xs",
        destructive:
          "bg-error text-white hover:bg-red-600 shadow-xs focus-visible:ring-error/20 dark:focus-visible:ring-error/40",
        outline:
          "border border-gray-400 bg-transparent text-black hover:bg-gray-100 dark:bg-black/30 dark:hover:bg-black/50",
        secondary: "bg-secondary text-white hover:bg-secondary-600 shadow-xs",
        ghost: "bg-transparent hover:bg-gray-100 text-black dark:hover:bg-black/40",
        link: "text-primary underline underline-offset-4 hover:text-primary-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 py-1 rounded-12 has-[>svg]:px-2.5",
        lg: "h-10 px-6 py-2 rounded-20 has-[>svg]:px-4",
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
