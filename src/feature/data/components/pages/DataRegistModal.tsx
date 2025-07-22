import BottomSheetHeader from "@/components/common/bottomsheet/BottomSheetHeader";
import FilterCardContent from "@/feature/data/components/sections/filter/FilterCardContent";
import { useState } from "react";
import { postMobileDataProduct } from "@/feature/data/api/dataRequest";
import FlatCard from "@components/common/card/FlatCard";
import { badgeVariants } from "@components/common/badge/badgeVariants";
import InputComponent from "@components/common/input/InputComponent";
import { buttonVariants } from "@components/common/button/buttonVariants";
import { Switch } from "@ui/switch";

export default function DataRegistModal({ onClose }: { onClose: () => void }) {
    const [value, setValue] = useState([1]); // GB 슬라이더
    const [price, setPrice] = useState("");
    const [isSplit, setIsSplit] = useState(false);

    const handleRegister = async () => {
        const dataAmount = Number((value[0] * 1024).toFixed(1)); // MB 단위
        const priceInt = parseInt(price, 10);
        if (isNaN(priceInt) || priceInt <= 0) {
            alert("유효한 가격을 입력해주세요.");
            return;
        }

        try {
            const res = await postMobileDataProduct(dataAmount, priceInt, isSplit);
            if (res.code === 0) {
                alert("등록 완료!");
                onClose();
            }
        } catch (e) {
            console.error(e);
            alert("등록 중 오류가 발생했습니다.");
        }
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

            <div className="flex gap-2 mt-4">
                <span className={badgeVariants({ variant: "outlined", size: "sm" })}>
                    최근 거래가: 2000원
                </span>
                <span className={badgeVariants({ variant: "outlined", size: "sm" })}>
                    평균 거래가: 2000원
                </span>
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
