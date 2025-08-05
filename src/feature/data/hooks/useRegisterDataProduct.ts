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
                console.log("등록 요청 파라미터", { price, dataAmount, isSplitType });
                const res = await postMobileDataProduct(dataAmount, price, isSplitType);

                if (res.code === 0) {
                    toast.success("등록 완료!");
                    queryClient.invalidateQueries({ queryKey: ["dataItems"] });
                    onSuccess?.();
                }
            } catch (e) {
                console.error(e);
                toast.error((e as Error).message);
            }
        },
        [queryClient]
    );

    return { register };
};
