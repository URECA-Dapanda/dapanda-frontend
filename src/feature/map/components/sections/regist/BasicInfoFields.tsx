import InputComponent from "@components/common/input/InputComponent";
import { badgeVariants } from "@components/common/badge/badgeVariants";
import type { SaleType } from "@/feature/map/hooks/useRegisterFormState";
import { RegisterFormValues, RegisterFormErrors } from "@/feature/map/types/registerForm";

import { cn } from "@/lib/utils";

interface Props {
  form: RegisterFormValues;
  updateForm: <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => void;
  errors: RegisterFormErrors;
  type: SaleType;
}
export default function BasicInfoFields({ form, updateForm, errors, type }: Props) {
  return (
    <>
      {/* 제목 */}
      <label className="title-sm mb-8 block">제목</label>
      <InputComponent
        placeholder="예: 강남역 2번 출구 앞"
        value={form.title}
        onChange={(e) => updateForm("title", e.target.value)}
        className={cn("w-full mb-12 px-3", errors.title && "border-primary border-[2px]")}
        radius="md"
        size="md"
      />
      {errors.title && <p className="text-primary text-sm mb-8">제목을 입력해주세요.</p>}

      {/* 설명 */}
      <label className="title-sm mb-8 block">설명</label>
      <InputComponent
        as="textarea"
        placeholder="위치 설명, 이용 조건 등을 입력해주세요"
        value={form.description}
        onChange={(e) => updateForm("description", e.target.value)}
        className={cn("mb-12", errors.description && "border-primary border-[2px]")}
        radius="md"
        size="md"
        rows={3}
      />
      {errors.description && <p className="text-primary text-sm mb-8">설명을 입력해주세요.</p>}

      {/* 가격 */}
      <div className="flex items-center mb-8 gap-8">
        <label className="title-sm block">가격 ({type === "hotspot" ? "15분" : "10분"})</label>
        <div className="flex gap-8">
          <span className={badgeVariants({ variant: "outlined", size: "md" })}>
            최근 거래가: 2000원
          </span>
          <span className={badgeVariants({ variant: "outlined", size: "md" })}>
            평균 거래가: 2000원
          </span>
        </div>
      </div>
      <InputComponent
        placeholder="예: 300"
        value={form.price}
        onChange={(e) => updateForm("price", e.target.value)}
        className={cn("w-full mb-8 px-3", errors.price && "border-primary border-[2px]")}
        radius="md"
        size="md"
        type="number"
      />
      {errors.price && <p className="text-primary text-sm mb-8">가격을 입력해주세요.</p>}
    </>
  );
}
