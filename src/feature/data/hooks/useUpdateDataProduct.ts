import { useCallback } from "react";
import { putMobileDataProduct } from "@feature/data/api/dataRequest";
import { showSuccessToast } from "@lib/toast";
import { useQueryClient } from "@tanstack/react-query";
import { throttle } from "lodash";

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
        const throttledPutMobileDataProduct = throttle(
          async () => await putMobileDataProduct({ productId, changedAmount, price, isSplitType }),
          500
        );
        const res = await throttledPutMobileDataProduct();
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
