"use client";

import BaseModal from "@components/common/modal/BaseModal";
import ModalHeader from "@components/common/modal/ModalHeader";
import SelectTypeCard from "@feature/map/components/sections/regist/SelectTypeCard";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MapRegisterModal({ open, onClose }: Props) {
  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <ModalHeader title="등록 유형 선택" onClose={onClose} />
      <SelectTypeCard />
    </BaseModal>
  );
}
