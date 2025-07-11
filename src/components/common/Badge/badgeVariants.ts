import { cva } from "class-variance-authority";

export const badgeVariants = cva("text-[12px] font-medium", {
  variants: {
    variant: {
      wifi: "flex justify-center items-center px-3 py-1 w-[58px] h-[25px] rounded-full bg-color-bg-primary2 text-color-text-black",
      hotspot:
        "flex justify-center items-center px-3 py-1 w-[58px] h-[25px] rounded-full bg-color-bg-secondary2 text-color-text-black",

      dot: "flex items-center justify-center w-[14px] h-[14px] rounded-full bg-bg-primary text-white text-[10px] leading-none",
      compact:
        "flex justify-center items-center p-0 w-[49px] h-[22px] rounded-full bg-bg-primary text-color-text-white",
      compactWide:
        "flex justify-center items-center p-0 w-[83px] h-[22px] rounded-full bg-bg-primary text-color-text-white",
      modalIcon:
        "flex items-center justify-center w-[70px] h-[70px] rounded-full bg-color-bg-success text-white",
      report:
        "absolute w-[30px] h-[30px] flex items-center justify-center rounded-full bg-color-bg-error text-white",
    },
  },
  defaultVariants: {
    variant: "wifi",
  },
});
