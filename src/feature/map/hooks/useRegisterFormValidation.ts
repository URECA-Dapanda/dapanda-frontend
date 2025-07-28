import { useState } from "react";
import type { RegisterFormValues, RegisterFormErrors } from "@feature/map/types/registerForm";
import { parseHHMMToTime, isValidTimeRange } from "@/lib/time";

const initialErrors: RegisterFormErrors = {
  title: false,
  description: false,
  price: false,
  startTime: false,
  endTime: false,
  timeOrderInvalid: false,
};

export const useRegisterFormValidation = (form: RegisterFormValues) => {
  const [errors, setErrors] = useState<RegisterFormErrors>(initialErrors);

  const validate = () => {
    if (!form.title.trim()) {
      setErrors({ ...initialErrors, title: true });
      return false;
    }

    if (!form.description.trim()) {
      setErrors({ ...initialErrors, description: true });
      return false;
    }

    if (!form.price.trim()) {
      setErrors({ ...initialErrors, price: true });
      return false;
    }

    if (!form.startTime.trim()) {
      setErrors({ ...initialErrors, startTime: true });
      return false;
    }

    if (!form.endTime.trim()) {
      setErrors({ ...initialErrors, endTime: true });
      return false;
    }

    const start = parseHHMMToTime(form.startTime);
    const end = parseHHMMToTime(form.endTime);

    if (!isValidTimeRange(start, end)) {
      setErrors({ ...initialErrors, timeOrderInvalid: true });
      return false;
    }

    setErrors(initialErrors);
    return true;
  };

  return { errors, validate };
};
