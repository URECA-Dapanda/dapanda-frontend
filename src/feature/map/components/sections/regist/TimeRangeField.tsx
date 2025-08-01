import InputComponent from "@components/common/input/InputComponent";
import type { RegisterFormValues, RegisterFormErrors } from "@feature/map/types/registerForm";

import { cn } from "@/lib/utils";

interface Props {
  form: RegisterFormValues;
  updateForm: <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => void;
  errors: RegisterFormErrors;
}

export default function TimeRangeField({ form, updateForm, errors }: Props) {
  const handleTimeChange =
    (key: "startTime" | "endTime") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const input = e.target.value;

      const raw = input.replace(/[^0-9]/g, "");

      let formatted = raw;
      if (raw.length >= 3) {
        formatted = `${raw.slice(0, 2)}:${raw.slice(2, 4)}`;
      }

      if (formatted.length > 5) return;

      const [hh, mm] = formatted.split(":");
      const hour = Number(hh);
      const minute = Number(mm);

      const isValid =
        (!isNaN(hour) &&
          !isNaN(minute) &&
          ((hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) ||
            (hour === 24 && minute === 0))) ||
        formatted.length < 5;

      if (isValid) {
        updateForm(key, formatted);
      }
    };

  return (
    <section className="mb-16">
      <label className="title-sm mb-12 block">이용 시간</label>
      <div className="flex gap-8 items-center mb-4">
        <InputComponent
          placeholder="예: 09:00"
          value={form.startTime}
          onChange={handleTimeChange("startTime")}
          className={cn("px-3", errors.startTime && "border-primary border-[2px]")}
          radius="md"
          size="md"
        />
        <span>~</span>
        <InputComponent
          placeholder="예: 18:00"
          value={form.endTime}
          onChange={handleTimeChange("endTime")}
          className={cn("px-3", errors.endTime && "border-primary border-[2px]")}
          radius="md"
          size="md"
        />
      </div>
      {errors.startTime && <p className="text-primary text-sm mb-2">시작 시간을 입력해주세요.</p>}
      {errors.endTime && <p className="text-primary text-sm mb-2">종료 시간을 입력해주세요.</p>}
      {errors.timeOrderInvalid && (
        <p className="text-primary text-sm mb-6">시작 시간은 종료 시간보다 빨라야 합니다.</p>
      )}
    </section>
  );
}
