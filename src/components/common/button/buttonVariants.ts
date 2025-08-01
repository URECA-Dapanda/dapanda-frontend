import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center min-w-fit w-auto rounded-6 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        primary2: "bg-primary2 text-primary",
        secondary: "bg-secondary text-color-text-black",
        outlinePrimary: "border border-primary text-primary bg-white",
        outlineGray: "border border-gray-300 text-color-text-black bg-white",
        nonoutline: "bg-white text-black title-xs",
        loading: "bg-gray-300 text-white",
        card: "bg-white text-color-text-black border border-gray-300",
        text: "shadow-none border-none text-gray-600 bg-transparent body-sm",
        floatingOutline: "bg-white text-black border border-gray-400 rounded-20",
        floatingPrimary: "bg-primary text-white rounded-20",
        floatingPill:
          "!w-[48px] !h-[48px] !rounded-circle bg-white border border-gray-200 rounded-circle",
        toggle: "border border-black text-black rounded-20 bg-white",
        withIcon: "flex items-center gap-2 bg-white text-black shadow rounded-6 ",
      },
      size: {
        xxs: "h-[24px]",
        xs: "h-[29px]",
        sm: "h-[30px]",
        md: "h-[33px]",
        lg: "h-[34px]",
        xl: "h-[35px]",
        "2xl": "h-[38px]",
        "3xl": "h-[44px]",
        "4xl": "h-[48px]",
        float: "h-[30px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "xl",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
