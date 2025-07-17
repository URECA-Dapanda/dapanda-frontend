import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface ContainerBoxProps {
  direction?: "row" | "column";
  gap?: string;
}

const containerVariant = cva("p-4", {
  variants: {
    variant: {
      row: "flex flex-row items-center justify-between w-full h-fit",
      column: "flex flex-col justify-center w-fit h-full",
    },
  },
  defaultVariants: {
    variant: "column",
  },
});

/**
 * `ContainerBox`는 방향성과 간격을 조절할 수 있는 재사용 가능한 레이아웃 래퍼 컴포넌트입니다.
 *
 * 이 컴포넌트는 기본적으로 `flex` 레이아웃을 사용하며,
 * `direction` props를 통해 가로(`row`) 또는 세로(`column`) 배치를 설정할 수 있습니다.
 * `gap` props를 통해 내부 요소 간의 간격도 자유롭게 조절할 수 있습니다.
 *
 * @example
 * ```tsx
 * <ContainerBox direction="row" gap="24">
 *   <ComponentA />
 *   <ComponentB />
 * </ContainerBox>
 * ```
 *
 * @param direction - 레이아웃의 주 방향을 지정합니다. `"row"` 또는 `"column"`을 선택할 수 있으며 기본값은 `"column"`입니다.
 * @param gap - 내부 요소 간의 간격을 픽셀 단위로 지정합니다. 문자열 형태로 숫자만 입력하세요. 기본값은 `"16"`입니다.
 * @param children - 래핑할 자식 요소들입니다.
 *
 * @returns 지정된 방향과 간격으로 스타일링된 div 컨테이너를 반환합니다.
 */
export default function ContainerBox({
  direction = "column",
  gap = "16px",
  children,
}: PropsWithChildren<ContainerBoxProps> & VariantProps<typeof containerVariant>) {
  return (
    <div className={containerVariant({ variant: direction })} style={{ gap: `${gap}px` }}>
      {children}
    </div>
  );
}
