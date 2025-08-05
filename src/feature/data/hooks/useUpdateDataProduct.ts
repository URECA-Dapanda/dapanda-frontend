import { useCallback } from "react";
import {  useQueryClient } from "@tanstack/react-query";
import { putMobileDataProduct } from "@feature/data/api/dataRequest";
import { showSuccessToast } from "@lib/toast";

export const useUpdateDataProduct = () => {
  const queryClient = useQueryClient();

  const update = useCallback(
    async ({
      productId,
      changedAmount,
      price,
      isSplitType,
      onSuccess,
    }: {
      productId: number;
      changedAmount: number;
      price: number;
      isSplitType: boolean;
      onSuccess?: () => void;
    }) => {
      try {
        const res = await putMobileDataProduct({ productId, changedAmount, price, isSplitType });
        if (res.code === 0) {
          queryClient.invalidateQueries({ queryKey: ["dataDetail", productId.toString()] });
          showSuccessToast("수정이 완료되었습니다.");
          onSuccess?.();
        }
      } catch (e) {
        console.error(e);
        showSuccessToast("수정 중 오류가 발생했습니다.");
      }
    },
    [queryClient]
  );

  return { update };
};
