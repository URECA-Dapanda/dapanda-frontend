import { cva } from "class-variance-authority";

export const badgeVariants = cva("", {
  variants: {
    variant: {
      mapcategory:
        "flex justify-center items-center p-0 w-[58px] h-[25px] rounded-full text-black body-xxs",
      number:
        "justify-center items-center min-w-5 h-[22px] rounded-full bg-bg-primary px-1 tabular-nums text-white body-xxs",
      badgeInCard:
        "flex justify-center items-center px-3 py-1 w-[80px] h-[20px] rounded-full bg-bg-primary text-white body-xxs",
    },
  },
  defaultVariants: {
    variant: "mapcategory",
  },
});
