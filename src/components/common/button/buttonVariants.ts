import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        main: "text-title-sm",
        modalPrimary: "text-body-md",
        modalSecondary: "text-body-md bg-white border",
        card: "text-body-xs",
      },
      size: {
        sm: "h-[29px] w-full",
        md: "h-[30px] w-full",
        lg: "h-[35px] w-full",
      },
    },
    defaultVariants: {
      variant: "main",
      size: "md",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
