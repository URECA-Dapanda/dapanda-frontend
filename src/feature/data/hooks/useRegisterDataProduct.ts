import { useCallback } from "react";
import { postMobileDataProduct } from "@feature/data/api/dataRequest";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const useRegisterDataProduct = () => {
    const queryClient = useQueryClient();

    const register = useCallback(
        async ({
            dataAmount,
            price,
            isSplitType,
            onSuccess,
        }: {
            dataAmount: number;
            price: number;
            isSplitType: boolean;
            onSuccess?: () => void;
        }) => {
            if (isNaN(price) || price <= 0) {
                toast.error("유효한 가격을 입력해주세요.");
                return;
            }

            try {
                const res = await postMobileDataProduct(dataAmount, price, isSplitType);
                if (res.code === 0) {
                    toast.success("등록 완료!");
                    queryClient.invalidateQueries({ queryKey: ["dataItems"] });
                    onSuccess?.();
                }
            } catch (e) {
                console.error(e);
                toast.error("등록 중 오류가 발생했습니다.");
            }
        },
        [queryClient]
    );

    return { register };
};
