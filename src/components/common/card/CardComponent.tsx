import { PropsWithChildren } from "react";
import { Card } from "@ui/card";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

type CardVariant = "material" | "flat" | "outlined";
type CardSize = "lg" | "md" | "sm" | "xs" | number;
type CardColor =
  | {
      from: string;
      to: string;
    }
  | string;

interface CardComponentProps {
  variant: CardVariant;
  size: CardSize;
  color: CardColor;
}

const cardVariant = cva(
  "inline-flex gap-2 whitespace-nowrap rounded-md transition-all rounded-[20px] ",
  {
    variants: {
      variant: {
        material: "border-none shadow-[0px_20px_35px_0px_rgba(0,0,0,0.05)]",
        flat: "border-none shadow-none",
        outlined: "border shadow-xs dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      },
      size: {
        md: "h-36 w-full",
        lg: "h-38 w-full",
        sm: "h-30 w-full",
        xs: "h-20 w-full",
      },
    },
    defaultVariants: {
      variant: "material",
      size: "md",
    },
  }
);

/**
 * `CardComponent`는 다양한 스타일, 크기, 색상 옵션을 가진 재사용 가능한 카드 컴포넌트입니다.
 *
 * 이 컴포넌트는 `shadcn/ui` 라이브러리의 `Card` 컴포넌트를 기반으로 하며,
 * `variant`, `size`, `color` 등의 props를 통해 유연하게 커스터마이징할 수 있습니다.
 *
 * ### Props
 * @param variant - 카드 스타일을 지정합니다.
 *  - `"material"`: 그림자 효과가 있는 기본 카드 스타일
 *  - `"flat"`: 테두리와 그림자가 없는 평면 스타일
 *  - `"outlined"`: 외곽선만 있는 스타일
 *
 * @param size - 카드의 높이를 지정합니다.
 *  - `"lg"`: 152px (`h-38`)
 *  - `"md"`: 144px (`h-36`)
 *  - `"sm"`: 120px (`h-30`)
 *  - 숫자 값을 직접 넘겨서 커스텀도 가능 (`number`는 현재 사용되지 않음)
 *
 * @param color - 카드 배경 색상
 *  - 문자열(`string`) 형식의 Tailwind 클래스 (예: `"bg-primary"`)
 *  - 또는 `from`, `to` 키를 가진 gradient 객체 (예: `{ from: "pink-500", to: "blue-500" }`) *(※ 현재 gradient는 미적용 상태)*
 *
 * @param children - 카드 내부에 렌더링할 자식 요소들
 *
 * ### 예시
 * ```tsx
 * <CardComponent variant="material" size="medium" color="bg-primary">
 *   <p>카드 내용</p>
 * </CardComponent>
 * ```
 *
 * @returns 스타일이 적용된 카드 컴포넌트를 렌더링합니다.
 */

export default function CardComponent({
  variant,
  size,
  color = "transparent",
  children,
}: PropsWithChildren<Partial<CardComponentProps>> & VariantProps<typeof cardVariant>) {
  return <Card className={cn(color, cardVariant({ variant, size }))}>{children}</Card>;
}
