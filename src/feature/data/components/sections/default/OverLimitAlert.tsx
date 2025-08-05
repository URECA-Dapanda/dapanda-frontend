import { formatDataSize } from "@lib/formatters";

interface OverLimitAlertProps {
  isSplitType: boolean;
  selectedAmount: number;
  remainAmount: number;
  remainingBuying: number | undefined;
}

export default function OverLimitAlert({
  isSplitType,
  selectedAmount,
  remainAmount,
  remainingBuying,
}: OverLimitAlertProps) {
  if (remainingBuying === undefined) return null;

  // 일반
  if (!isSplitType && remainAmount > remainingBuying) {
    return (
      <p className="body-xxs text-error">
        ⚠️ 최대 구매 가능 용량을 초과했습니다. 최대 {formatDataSize(remainingBuying)}까지 구매할 수 있어요.
      </p>
    );
  }

  // 분할
  if (isSplitType && selectedAmount >= remainingBuying) {
    return (
      <p className="body-xxs text-error text-left mt-8">
        ⚠️ 이번 달 최대 구매 가능 용량에 도달했습니다. 최대 {formatDataSize(remainingBuying)}까지 선택할 수 있어요.
      </p>
    );
  }

  return null;
}
