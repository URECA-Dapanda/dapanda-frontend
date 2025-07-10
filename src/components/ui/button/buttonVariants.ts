import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: `
          bg-bg-primary text-color-text-white
          hover:bg-color-primary-600
          disabled:bg-color-gray-300 disabled:text-color-text-white
        `,
        secondary: `
          bg-color-bg-secondary text-color-text-black
          hover:bg-color-secondary-100
          disabled:bg-color-gray-200 disabled:text-color-text-black
        `,
        ghost: `
          bg-transparent text-color-text-black
          hover:bg-color-gray-100
          disabled:text-color-text-black
        `,
        halfOutline: `
          bg-white border border-bg-primary
          text-bg-primary
          hover:bg-color-primary-50
          disabled:bg-color-gray-100 disabled:text-color-gray-400
        `,
      },
      size: {
        large: "w-[327px] h-[35px] px-4 py-2 rounded-[6px]",
        pill: "w-[70px] h-[35px] px-[6px] py-[5px] rounded-[20px]",
        small: "w-[52px] h-[35px] px-4 py-2 rounded-[6px]",
        modalFull: "w-[288px] h-[34px] px-4 py-2 rounded-[6px]",
        half: "w-[135px] h-[35px] px-4 py-2 rounded-[6px]",
        medium: "w-[191px] h-[29px] px-4 py-2 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "large",
    },
  }
);
