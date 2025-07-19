"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonComponent } from "@components/common/button";
import BasicInfoFields from "@/feature/map/components/sections/regist/BasicInfoFields";
import TimeRangeField from "@/feature/map/components/sections/regist/TimeRangeField";
import ImageUploader from "@/feature/map/components/sections/regist/ImageUploader";
import RegisterSuccessModal from "@/feature/map/components/sections/regist/RegisterSuccessModal";
import { useRegisterFormState, SaleType } from "@/feature/map/hooks/useRegisterFormState";
import { useRegisterFormValidation } from "@feature/map/hooks/useRegisterFormValidation";

interface RegisterFormProps {
  type: SaleType;
  onSubmit?: (data: {
    title: string;
    description: string;
    price: string;
    startTime: string;
    endTime: string;
  }) => void;
}

export default function RegisterForm({ type, onSubmit }: RegisterFormProps) {
  const router = useRouter();
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const { form, updateForm } = useRegisterFormState();
  const { errors, validate } = useRegisterFormValidation(form);

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;

    onSubmit?.(form);
    setIsCompleteModalOpen(true);
  };

  return (
    <div className="mx-auto py-6">
      <div className="title-md mb-16">{type === "hotspot" ? "핫스팟 판매" : "와이파이 판매"}</div>

      <BasicInfoFields form={form} updateForm={updateForm} errors={errors} type={type} />
      <TimeRangeField form={form} updateForm={updateForm} errors={errors} />

      <label className="title-sm mb-12 block">사진 첨부</label>
      <ImageUploader images={["/starbucks.png", "/starbucks.png"]} />

      <ButtonComponent className="w-full" variant="secondary" size="4xl" onClick={handleSubmit}>
        등록하기
      </ButtonComponent>

      <RegisterSuccessModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        type={type}
        onGoHome={() => router.push("/map")}
      />
    </div>
  );
}
