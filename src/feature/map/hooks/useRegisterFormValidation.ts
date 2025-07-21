import { useState } from "react";
import type { RegisterFormValues, RegisterFormErrors } from "@feature/map/types/registerForm";

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

    const [sh, sm] = form.startTime.split(":").map(Number);
    const [eh, em] = form.endTime.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    if (start >= end) {
      setErrors({ ...initialErrors, timeOrderInvalid: true });
      return false;
    }

    setErrors(initialErrors);
    return true;
  };

  return { errors, validate };
};
