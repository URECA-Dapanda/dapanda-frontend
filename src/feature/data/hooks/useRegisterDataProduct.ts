import { useCallback } from "react";
import { postMobileDataProduct } from "@feature/data/api/dataRequest";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@lib/toast";
import { throttle } from "lodash";

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
        showErrorToast("유효한 가격을 입력해주세요.");
        return;
      }

      try {
        const throttledPostMobileDataProduct = throttle(
          async () => await postMobileDataProduct(dataAmount, price, isSplitType),
          500
        );
        const res = await throttledPostMobileDataProduct();

        if (res.code === 0) {
          showSuccessToast("등록 완료!");
          queryClient.invalidateQueries({ queryKey: ["dataItems"] });
          onSuccess?.();
        }
      } catch (e) {
        console.debug(e);
        showErrorToast((e as Error).message);
      }
    },
    [queryClient]
  );

  return { register };
};
