import { useState } from "react";
import BottomSheetHeader from "@/components/common/bottomsheet/BottomSheetHeader";
import FilterCardContent from "@/feature/data/components/sections/filter/FilterCardContent";
import FlatCard from "@components/common/card/FlatCard";
import { badgeVariants } from "@components/common/badge/badgeVariants";
import InputComponent from "@components/common/input/InputComponent";
import { buttonVariants } from "@components/common/button/buttonVariants";
import { usePriceRecommendation } from "@feature/data/hooks/usePriceRecommendation";
import { useRegisterDataProduct } from "@feature/data/hooks/useRegisterDataProduct";
import { useUpdateDataProduct } from "@feature/data/hooks/useUpdateDataProduct";
import { useMonthlyDataLimit } from "@feature/data/hooks/useMonthlyDataLimit";
import { Switch } from "@ui/switch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ButtonComponent } from "@components/common/button";
import { useMutation } from "@tanstack/react-query";

interface DataRegistModalProps {
  onClose: () => void;
  mode?: "create" | "edit";
  defaultValues?: {
    productId: number;
    price: number;
    amount: number;
    isSplitType: boolean;
  };
}

export default function DataRegistModal({
  onClose,
  mode = "create",
  defaultValues,
}: DataRegistModalProps) {
  const router = useRouter();
  const { remainingSelling } = useMonthlyDataLimit();
  const maxAmount = remainingSelling ?? 2;
  const [value, setValue] = useState([Math.min(defaultValues?.amount ?? 1, maxAmount)]);
  const [price, setPrice] = useState(defaultValues?.price?.toString() ?? "");
  const [isSplit, setIsSplit] = useState(defaultValues?.isSplitType ?? false);
  const dataAmount = Math.round(value[0] * 10) / 10;

  const { recentPrice, avgPrice } = usePriceRecommendation();
  const { register } = useRegisterDataProduct();
  const { update } = useUpdateDataProduct();

  const { mutate: registMutation, isPending: isRegistPending } = useMutation({
    mutationKey: [""],
    mutationFn: register,
  });

  const { mutate: updateMtation, isPending: isUpdatePending } = useMutation({
    mutationKey: [""],
    mutationFn: update,
  });

  const handleSubmit = () => {
    const priceInt = parseInt(price, 10);

    if (isNaN(priceInt) || priceInt <= 0) {
      toast.error("유효한 가격을 입력해주세요.");
      return;
    }

    if (mode === "edit" && defaultValues?.productId) {
      updateMtation({
        productId: defaultValues.productId,
        changedAmount: dataAmount,
        price: priceInt,
        isSplitType: isSplit,
        onSuccess: () => {
          toast.success("수정 완료!");
          onClose();
          router.refresh();
        },
      });
    } else {
      registMutation({
        dataAmount,
        price: priceInt,
        isSplitType: isSplit,
        onSuccess: () => {
          setPrice("");
          setValue([1]);
          setIsSplit(false);
          onClose();
          router.refresh();
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-24 p-24 bg-white">
      <BottomSheetHeader title={mode === "edit" ? "데이터 수정" : "데이터 판매"} />
      <FlatCard size="xl">
        <FilterCardContent
          buttonText="확정"
          value={value}
          onValueChange={setValue}
          max={maxAmount}
        />
        {value[0] >= maxAmount && (
          <p className="body-xxs text-error mt-20">
            이번 달 최대 판매 가능량을 모두 사용하셨습니다.
          </p>
        )}
      </FlatCard>
      <div className="flex gap-6 mt-4">
        {recentPrice !== null && (
          <span className={badgeVariants({ variant: "outlined", size: "sm" })}>
            최근 거래가: {(dataAmount * 10 * recentPrice).toLocaleString()}원
          </span>
        )}
        {avgPrice !== null && (
          <span className={badgeVariants({ variant: "outlined", size: "sm" })}>
            평균 거래가: {(dataAmount * 10 * avgPrice).toLocaleString()}원
          </span>
        )}
      </div>
      <InputComponent
        type="text"
        inputMode="numeric"
        placeholder="예: 8000"
        value={price}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          const numeric = raw === "" ? "" : Math.min(parseInt(raw, 10), 10_000_000).toString();
          setPrice(numeric);
        }}
        className="mt-4 w-full"
      />

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-black font-medium">분할 판매</p>
          <p className="text-sm text-gray-500">소량으로 나누어 판매 허용</p>
        </div>
        <Switch
          checked={isSplit}
          onCheckedChange={setIsSplit}
          className="w-40 h-24 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
        />
      </div>
      <button
        className={buttonVariants({ variant: "secondary", size: "4xl" }) + " w-full mt-6 body-md"}
        onClick={handleSubmit}
        disabled={isRegistPending || isUpdatePending}
      >
        {mode === "edit" ? "수정하기" : "등록하기"}
      </button>
    </div>
  );
}
