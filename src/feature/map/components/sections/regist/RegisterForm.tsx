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
import { usePresignedUpload } from "@/hooks/usePresignedUpload";

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
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { form, updateForm, setAllForm } = useRegisterFormState();
  const { errors, validate } = useRegisterFormValidation(form);
  const { uploadFiles } = usePresignedUpload();

  const readFilesAsDataUrls = (files: File[]): Promise<string[]> => {
    return Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
  };

  const handleImageChange = async (files: File[]) => {
    const previews = await readFilesAsDataUrls(files);
    setPreviewUrls(previews);

    const uploadedUrls = await uploadFiles(files);
    updateForm("images", uploadedUrls);
  };

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
        images: data.imageUrls ?? [],
      });
      setPreviewUrls(data.imageUrls ?? []);
    })();
  }, [isEditMode, productId]);

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;
    submit();
  };

  const { submit } = usePostWifiRegister({
    form,
    onSuccess: () => setIsCompleteModalOpen(true),
    onSubmit,
  });

  return (
    <div className="mx-auto py-6 space-y-4">
      <div className="title-md mb-16">
        {isEditMode ? "상품 정보 수정" : type === "hotspot" ? "핫스팟 판매" : "와이파이 판매"}
      </div>

      <BasicInfoFields form={form} updateForm={updateForm} errors={errors} type={type} />
      <TimeRangeField form={form} updateForm={updateForm} errors={errors} />

      <label className="title-sm mb-12 block">사진 첨부</label>
      <ImageUploader
        images={form.images ?? []} // S3 업로드 완료된 URL
        previews={previewUrls} // base64 미리보기용
        onChange={handleImageChange}
      />

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
