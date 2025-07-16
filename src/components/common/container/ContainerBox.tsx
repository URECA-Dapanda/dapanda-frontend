import { cn } from "@lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface ContainerBoxProps {
  direction?: "row" | "colomn";
  gap?: string;
}

const containerVariant = cva("p-4", {
  variants: {
    variant: {
      row: "flex flex-row items-center justify-between w-full h-fit",
      colomn: "flex flex-col justify-center w-fit h-full",
    },
  },
  defaultVariants: {
    variant: "colomn",
  },
});

export default function ContainerBox({
  direction = "colomn",
  gap = "16px",
  children,
}: PropsWithChildren<ContainerBoxProps> & VariantProps<typeof containerVariant>) {
  return (
    <div className={containerVariant({ variant: direction })} style={{ gap: `${gap}px` }}>
      {children}
    </div>
  );
}
