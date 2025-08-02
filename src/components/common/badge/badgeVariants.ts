import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva("inline-flex items-center justify-center rounded-full body-xxs", {
  variants: {
    variant: {
      mapcategory: "p-0 w-[58px] text-black",
      count: "min-w-5 bg-primary text-white",
      label: "px-3 bg-primary text-white",
      meta: "px-3 text-black",
      outlined: "px-3 bg-white border border-primary/20 text-black",
      largeOutlined: "px-8 py-4 bg-white border border-primary/20 text-black title-xs"
    },
    size: {
      sm: "h-[20px]",
      md: "h-[22px]",
      lg: "h-[25px]",
      xl: "h-[32px]",
    },
  },
  defaultVariants: {
    variant: "mapcategory",
    size: "md",
  },
});
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
