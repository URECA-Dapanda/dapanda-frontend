import { CheckCircle2 } from "lucide-react";
import BaseModal from "@components/common/modal/BaseModal";
import { ButtonComponent } from "@components/common/button";
import type { SaleType } from "@/feature/map/hooks/useRegisterFormState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  type: SaleType;
  isEdit?: boolean;
}

export default function RegisterSuccessModal({
  isOpen,
  onClose,
  onGoHome,
  type,
  isEdit = false,
}: Props) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-24">
        <CheckCircle2 className="w-68 h-68 text-success" />
        <div className="title-md">{isEdit ? "상품 수정 완료!" : "상품 등록 완료!"}</div>
        <p className="body-sm text-gray-600 mb-24">
          {isEdit
            ? type === "wifi"
              ? "와이파이 상품이 정상적으로 수정되었습니다."
              : "핫스팟 상품이 정상적으로 수정되었습니다."
            : type === "wifi"
            ? "와이파이 상품이 정상적으로 등록되었습니다."
            : "핫스팟 상품이 정상적으로 등록되었습니다."}
        </p>
      </div>
      <ButtonComponent className="w-full" variant="primary" size="xl" onClick={onGoHome}>
        홈으로 돌아가기
      </ButtonComponent>
    </BaseModal>
  );
}
