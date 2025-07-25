"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonComponent } from "@components/common/button";
import BasicInfoFields from "@/feature/map/components/sections/regist/BasicInfoFields";
import TimeRangeField from "@/feature/map/components/sections/regist/TimeRangeField";
import ImageUploader from "@/feature/map/components/sections/regist/ImageUploader";
import RegisterSuccessModal from "@/feature/map/components/sections/regist/RegisterSuccessModal";
import { useRegisterFormState, SaleType } from "@/feature/map/hooks/useRegisterFormState";
import { useRegisterFormValidation } from "@feature/map/hooks/useRegisterFormValidation";
import type { RegisterFormData } from "@/feature/map/types/registerForm";
import { usePostWifiRegister } from "@feature/map/hooks/usePostWifiRegister";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

export default function RegisterForm({
  type,
  onSubmit,
}: {
  type: SaleType;
  onSubmit?: (data: RegisterFormData) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const productId = searchParams.get("id");

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const { form, updateForm, setAllForm } = useRegisterFormState();
  const { errors, validate } = useRegisterFormValidation(form);

  // 등록 or 수정 API 연결
  const { submit } = usePostWifiRegister({
    form,
    onSuccess: () => setIsCompleteModalOpen(true),
    onSubmit,
  });

  //  수정 모드일 경우 기존 데이터 세팅
  useEffect(() => {
    if (!isEditMode || !productId) return;

    (async () => {
      const data = await getMapDetailById(productId);
      setAllForm({
        title: data.title,
        description: data.content,
        price: String(data.price),
        address: data.address ?? "",
        startTime: data.startTime.slice(11, 16),
        endTime: data.endTime.slice(11, 16),
        latitude: data.latitude,
        longitude: data.longitude,
      });
    })();
  }, [isEditMode, productId]);

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;
    submit();
  };

  return (
    <div className="mx-auto py-6 space-y-4">
      <div className="title-md mb-16">
        {isEditMode ? "상품 정보 수정" : type === "hotspot" ? "핫스팟 판매" : "와이파이 판매"}
      </div>

      <BasicInfoFields form={form} updateForm={updateForm} errors={errors} type={type} />
      <TimeRangeField form={form} updateForm={updateForm} errors={errors} />

      <label className="title-sm mb-12 block">사진 첨부</label>
      <ImageUploader images={["/starbucks.png", "/starbucks.png"]} />

      <ButtonComponent className="w-full" variant="secondary" size="4xl" onClick={handleSubmit}>
        {isEditMode ? "수정 완료" : "등록하기"}
      </ButtonComponent>

      <RegisterSuccessModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        type={type}
        isEdit={isEditMode}
        onGoHome={() => router.push("/map")}
      />
    </div>
  );
}
