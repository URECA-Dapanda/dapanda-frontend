import { useState } from "react";
import BottomSheetHeader from "@/components/common/bottomsheet/BottomSheetHeader";
import FilterCardContent from "@/feature/data/components/sections/filter/FilterCardContent";
import FlatCard from "@components/common/card/FlatCard";
import { badgeVariants } from "@components/common/badge/badgeVariants";
import InputComponent from "@components/common/input/InputComponent";
import { buttonVariants } from "@components/common/button/buttonVariants";
import { usePriceRecommendation } from "@feature/data/hooks/usePriceRecommendation";
import { useRegisterDataProduct } from "@feature/data/hooks/useRegisterDataProduct";
import { Switch } from "@ui/switch";

export default function DataRegistModal({ onClose }: { onClose: () => void }) {
    const [value, setValue] = useState([1]);
    const [price, setPrice] = useState("");
    const [isSplit, setIsSplit] = useState(false);
    const dataAmount = Number(value[0].toFixed(1));
    const { recentPrice, avgPrice } = usePriceRecommendation();
    const { register } = useRegisterDataProduct();

    const handleRegister = () => {
        const priceInt = parseInt(price, 10);
        register({
            dataAmount,
            price: priceInt,
            isSplitType: isSplit,
            onSuccess: onClose,
        });
    };

    return (
        <div className="flex flex-col gap-24 p-24 bg-white">
            <BottomSheetHeader title="데이터 판매" />
            <FlatCard size="xl">
                <FilterCardContent
                    buttonText="확정"
                    value={value}
                    onValueChange={setValue}
                    max={2}
                />
            </FlatCard>
            <div className="flex gap-6 mt-4">
                {recentPrice && (
                    <span className={badgeVariants({ variant: "outlined", size: "sm" })}>
                        최근 거래가: {(dataAmount * 10 * recentPrice).toLocaleString()}원
                    </span>
                )}
                {avgPrice && (
                    <span className={badgeVariants({ variant: "outlined", size: "sm" })}>
                        평균 거래가: {(dataAmount * 10 * avgPrice).toLocaleString()}원
                    </span>
                )}
            </div>
            <InputComponent
                type="number"
                placeholder="예: 8000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                className={buttonVariants({ variant: "secondary", size: "4xl" }) + " w-full mt-6"}
                onClick={handleRegister}
            >
                등록하기
            </button>
        </div>
    );
}
