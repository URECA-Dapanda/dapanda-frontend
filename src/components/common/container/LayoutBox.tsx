import { PropsWithChildren } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

interface LayoutBoxProps {
  layout?: "flex" | "grid"; // flex vs grid 선택
  direction?: "row" | "column"; // flex 방향 or grid axis 추론용
  gap?: string | number; // tailwind gap-x-4 형태가 아니라 px 단위로 인라인 처리
  columns?: number; // grid-cols 수
  rows?: number; // grid-rows 수
  autoFit?: boolean; // grid-auto-fit 형태
  width?: "fit" | "full";
  height?: "fit" | "full";
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
    width: {
      fit: "w-fit",
      full: "w-full",
    },
    height: {
      fit: "h-fit",
      full: "h-full",
    },
  },
  defaultVariants: {
    layout: "flex",
    direction: "column",
  },
});

/**
 * `LayoutBox` 컴포넌트는 `flex` 또는 `grid` 레이아웃을 손쉽게 구성할 수 있는 범용 레이아웃 래퍼입니다.
 * `class-variance-authority (cva)`를 활용하여 유연한 direction, gap, size 속성을 지원하며,
 * grid인 경우 컬럼/로우 개수 또는 auto-fit 기반 레이아웃도 설정할 수 있습니다.
 *
 * 주로 공통 레이아웃 래퍼로 활용되며, 복잡한 레이아웃 설정 없이 간단하게 방향, 간격, 크기 등을 지정할 수 있습니다.
 *
 * @example
 * ```tsx
 * <LayoutBox layout="grid" columns={3} gap={24}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </LayoutBox>
 *
 * <LayoutBox layout="flex" direction="row" gap="12px" width="full">
 *   <Button />
 *   <Button />
 * </LayoutBox>
 * ```
 *
 * @param layout - 레이아웃 방식 선택 (`flex` | `grid`). 기본값은 `"flex"`
 * @param direction - `flex-direction` 또는 `grid` axis 참고용 (`row` | `column`). 기본값은 `"column"`
 * @param gap - 항목 간 간격 (px 또는 문자열). `Tailwind gap-*` 대신 인라인으로 적용됨
 * @param columns - `grid-template-columns`의 개수. `layout="grid"`일 때만 사용됨
 * @param rows - `grid-template-rows`의 개수. `layout="grid"`일 때만 사용됨
 * @param autoFit - `grid-template-columns`를 `auto-fit`으로 설정할지 여부. `columns`보다 우선 적용됨
 * @param width - 전체 박스의 너비 설정 (`fit` | `full`). 기본값은 `"full"`
 * @param height - 전체 박스의 높이 설정 (`fit` | `full`). 기본값은 `"fit"`
 * @param children - 내부에 배치할 React 노드들
 *
 * @returns 레이아웃 설정이 적용된 `<div>` 래퍼 요소
 */
export default function LayoutBox({
  layout = "flex",
  direction = "column",
  gap = "16",
  columns,
  rows,
  autoFit = false,
  width = "full",
  height = "fit",
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
      className={clsx(layoutVariant({ layout, direction, width, height }), "")}
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
