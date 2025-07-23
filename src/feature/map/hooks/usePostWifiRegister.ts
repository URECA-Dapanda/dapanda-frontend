import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postWifiRegister } from "@/feature/map/api/mapRequest";
import type { RegisterFormValues, RegisterFormData } from "@/feature/map/types/registerForm";
import { formatToIsoDate } from "@lib/time";

interface UsePostWifiRegisterOptions {
  form: RegisterFormValues;
  onSuccess?: () => void;
  onSubmit?: (data: RegisterFormData) => void;
}

export const usePostWifiRegister = ({ form, onSuccess, onSubmit }: UsePostWifiRegisterOptions) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const address = searchParams.get("address") ?? "";

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!lat || !lng) {
        throw new Error("위치를 먼저 선택해주세요.");
      }

      await postWifiRegister({
        title: form.title,
        content: form.description,
        price: parseInt(form.price, 10),
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        startTime: formatToIsoDate(form.startTime),
        endTime: formatToIsoDate(form.endTime),
      });
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
  };
};
