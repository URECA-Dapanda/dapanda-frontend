import InputComponent from "@components/common/input/InputComponent";
import { badgeVariants } from "@components/common/badge/badgeVariants";
import type { SaleType } from "@feature/map/hooks/register/useRegisterFormState";
import { RegisterFormValues, RegisterFormErrors } from "@/feature/map/types/registerForm";
import { useWifiPriceRecommendation } from "@feature/map/hooks/query/useWifiPriceRecommendation";

import { cn } from "@/lib/utils";

interface Props {
  form: RegisterFormValues;
  updateForm: <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => void;
  errors: RegisterFormErrors;
  type: SaleType;
}
export default function BasicInfoFields({ form, updateForm, errors, type }: Props) {
  const { recentPrice, avgPrice } = useWifiPriceRecommendation();
  return (
    <>
      {/* 제목 */}
      <div className="flex justify-between items-center mb-8">
        <label className="title-sm">제목</label>
        <p className="text-right text-gray-500 body-xs">{form.title.length} / 30</p>
      </div>
      <InputComponent
        placeholder="예: 강남역 2번 출구 앞"
        value={form.title}
        onChange={(e) => updateForm("title", e.target.value)}
        className={cn("w-full mb-12 px-3", errors.title && "border-primary border-[2px]")}
        radius="md"
        size="md"
        maxLength={30}
      />
      {errors.title && <p className="text-primary body-sm mb-8">제목을 입력해주세요.</p>}

      {/* 설명 */}
      <div className="flex justify-between items-center mb-8">
        <label className="title-sm">설명</label>
        <p className="text-right text-gray-500 body-xs">{form.description.length} / 63</p>
      </div>
      <InputComponent
        as="textarea"
        placeholder="위치 설명, 이용 조건 등을 입력해주세요"
        value={form.description}
        onChange={(e) => updateForm("description", e.target.value)}
        className={cn("mb-12", errors.description && "border-primary border-[2px]")}
        radius="md"
        size="md"
        rows={3}
        maxLength={63}
      />
      {errors.description && <p className="text-primary body-sm mb-8">설명을 입력해주세요.</p>}

      {/* 가격 */}
      <div className="flex items-center mb-8 gap-8">
        <label className="title-sm block">가격 ({type === "hotspot" ? "15분" : "10분"})</label>
        {/* 추후 핫스팟 확장 고려하여 type 추가 */}
        {type === "wifi" && (
          <div className="flex gap-8 items-center">
            {recentPrice !== undefined && (
              <span className={badgeVariants({ variant: "outlined", size: "md" })}>
                최근 거래가: {recentPrice}원
              </span>
            )}
            {avgPrice !== undefined && (
              <span className={badgeVariants({ variant: "outlined", size: "md" })}>
                평균 거래가: {avgPrice}원
              </span>
            )}
          </div>
        )}
      </div>
      <InputComponent
        placeholder="예: 300"
        value={form.price}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          const numericValue = raw === "" ? "" : Math.min(parseInt(raw, 10), 10000000).toString();
          updateForm("price", numericValue);
        }}
        className={cn("w-full mb-8 px-3", errors.price && "border-primary border-[2px]")}
        radius="md"
        size="md"
        type="text"
        inputMode="numeric"
      />
      {errors.price && <p className="text-primary body-sm mb-8">가격을 입력해주세요.</p>}
    </>
  );
}
