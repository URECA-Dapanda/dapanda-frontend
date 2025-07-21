import { useState } from "react";
import type { RegisterFormValues } from "@/feature/map/types/registerForm";

export type SaleType = "hotspot" | "wifi";

export const useRegisterFormState = () => {
  const [form, setForm] = useState<RegisterFormValues>({
    title: "",
    description: "",
    price: "",
    startTime: "",
    endTime: "",
  });

  const updateForm = <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, updateForm };
};
