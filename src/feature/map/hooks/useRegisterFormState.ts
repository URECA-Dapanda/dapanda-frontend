import { useState } from "react";
import type { RegisterFormValues } from "@/feature/map/types/registerForm";

export type SaleType = "hotspot" | "wifi";

export const useRegisterFormState = () => {
  const [form, setForm] = useState<RegisterFormValues>({
    title: "",
    description: "",
    price: "",
    address: "",
    startTime: "",
    endTime: "",
    images: [],
  });

  const updateForm = <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 전체 초기값 세팅용
  const setAllForm = (newForm: RegisterFormValues) => {
    setForm(newForm);
  };

  return { form, updateForm, setAllForm };
};
