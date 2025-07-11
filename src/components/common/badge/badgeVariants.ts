import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva("inline-flex items-center justify-center rounded-full body-xxs", {
  variants: {
    variant: {
      mapcategory: "p-0 w-[58px] h-[25px] rounded-full text-black",
      count: "min-w-5 h-[22px] rounded-full bg-bg-primary text-white",
      label: "px-3 py-1 bg-bg-primary text-white",
    },
    size: {
      sm: "h-[20px]",
      md: "h-[22px]",
      lg: "h-[25px]",
    },
  },
  defaultVariants: {
    variant: "mapcategory",
    size: "md",
  },
});
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
