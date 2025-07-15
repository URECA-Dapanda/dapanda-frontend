import { cva } from "class-variance-authority";

export const dropdownVariants = cva(
  "flex items-center gap-8 px-12 py-6 body-sm rounded-6 transition-colors",
  {
    variants: {
      variant: {
        default: "text-gray-600 hover:bg-gray-200",
        destructive: "text-error hover:bg-error/10",
      },
      inset: {
        true: "pl-24",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inset: false,
    },
  }
);
