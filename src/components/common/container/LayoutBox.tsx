import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { PropsWithChildren } from "react";

interface LayoutBoxProps {
  layout?: "flex" | "grid"; // flex vs grid 선택
  direction?: "row" | "column"; // flex 방향 or grid axis 추론용
  gap?: string | number; // tailwind gap-x-4 형태가 아니라 px 단위로 인라인 처리
  columns?: number; // grid-cols 수
  rows?: number; // grid-rows 수
  autoFit?: boolean; // grid-auto-fit 형태
}

const layoutVariant = cva("", {
  variants: {
    layout: {
      flex: "flex",
      grid: "grid",
    },
    direction: {
      row: "flex-row justify-around items-center",
      column: "flex-col",
    },
  },
  defaultVariants: {
    layout: "flex",
    direction: "column",
  },
});

export default function LayoutBox({
  layout = "flex",
  direction = "column",
  gap = "16",
  columns,
  rows,
  autoFit = false,
  children,
}: PropsWithChildren<LayoutBoxProps> & VariantProps<typeof layoutVariant>) {
  const isGrid = layout === "grid";

  const gridTemplateColumns = autoFit
    ? "repeat(auto-fit, minmax(0, 1fr))"
    : columns
    ? `repeat(${columns}, minmax(0, 1fr))`
    : undefined;

  const gridTemplateRows = rows ? `repeat(${rows}, minmax(0, 1fr))` : undefined;

  return (
    <div
      className={clsx(layoutVariant({ layout, direction }), "w-full h-fit")}
      style={{
        gap: typeof gap === "number" ? `${gap}px` : gap,
        ...(isGrid
          ? {
              gridTemplateColumns,
              gridTemplateRows,
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
