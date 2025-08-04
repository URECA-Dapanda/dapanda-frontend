"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postWifiRegister, putWifiUpdate } from "@/feature/map/api/mapRequest";
import type { RegisterFormValues, RegisterFormData } from "@/feature/map/types/registerForm";
import { formatToIsoDate, formatToIsoDatePlusOneYear, parseHHMMToTime } from "@lib/time";
import { throttle } from "lodash";

interface UsePostWifiRegisterOptions {
  form: RegisterFormValues;
  onSuccess?: () => void;
  onSubmit?: (data: RegisterFormData) => void;
}

export const usePostWifiRegister = ({ form, onSuccess, onSubmit }: UsePostWifiRegisterOptions) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get("edit") === "true";
  const productId = searchParams.get("id");

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const address = searchParams.get("address") ?? "";

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!lat || !lng) {
        throw new Error("위치를 먼저 선택해주세요.");
      }

      const payload = {
        title: form.title,
        content: form.description,
        price: parseInt(form.price, 10),
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        startTime: formatToIsoDate(parseHHMMToTime(form.startTime)),
        endTime: formatToIsoDatePlusOneYear(form.endTime),
        address,
        images: form.images ?? [],
      };

      if (isEditMode) {
        if (!productId) throw new Error("수정할 상품 ID가 없습니다.");
        const throttledPutWifiUpdate = throttle(
          async () => await putWifiUpdate({ productId: Number(productId), ...payload }),
          500
        );
        await throttledPutWifiUpdate();
      } else {
        const throttledPostWifiRegister = throttle(
          async () => await postWifiRegister(payload),
          500
        );
        await throttledPostWifiRegister();
      }
    },
    onSuccess: () => {
      onSubmit?.({
        ...form,
        lat: parseFloat(lat!),
        lng: parseFloat(lng!),
        address,
      });

      router.refresh();
      onSuccess?.();
    },
    onError: (err) => {
      alert((err as Error).message || "등록 중 오류 발생");
    },
  });

  return {
    submit: mutation.mutate,
    isError: mutation.isError,
    isPending: mutation.isPending,
  };
};
