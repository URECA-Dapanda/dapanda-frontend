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
      <ModalHeader title="새 게시글 등록" onClose={onClose} />
      <SelectTypeCard />
    </BaseModal>
  );
}
