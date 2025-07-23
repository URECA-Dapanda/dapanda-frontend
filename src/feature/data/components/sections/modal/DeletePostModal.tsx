"use client";

import { ButtonComponent } from "@components/common/button";
import BaseModal from "@components/common/modal/BaseModal";
import ModalHeader from "@components/common/modal/ModalHeader";
import { deleteDataPost } from "@feature/data/api/dataRequest";
import { useMutation } from "@tanstack/react-query";
import { CircleAlertIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";

interface DeletePostModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeletePostModal({ isOpen, setIsOpen }: DeletePostModalProps) {
  const router = useRouter();
  const path = usePathname();
  const redirectTarget = useMemo(() => path.split("/").at(1) || "/", [path]);
  const target = useMemo(() => path.split("/").at(-1) || "", [path]);
  const mutation = useMutation({
    mutationFn: deleteDataPost,
    mutationKey: ["/api/products"],
    onSuccess: () => {
      router.replace(redirectTarget);
    },
  });

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDeleteClick = useCallback(() => {
    mutation.mutate(target);
  }, [target]);

  return (
    <BaseModal isOpen={isOpen} onClose={handleModalClose}>
      <ModalHeader title="게시물 삭제" onClose={handleModalClose} />
      <div className="h-[250px] w-full flex flex-col justify-center items-center title-sm gap-12">
        <CircleAlertIcon className="text-white" fill="red" size={100} />
        게시물을 삭제하시겠습니까?
        <p className="body-sm text-error">삭제 후 복구가 불가능합니다.</p>
      </div>
      <div className="flex flex-row justify-around w-full">
        <ButtonComponent variant={"text"} className="flex-1" onClick={handleDeleteClick}>
          삭제하기
        </ButtonComponent>
        <ButtonComponent variant={"primary"} className="flex-1" onClick={handleModalClose}>
          취소하기
        </ButtonComponent>
      </div>
    </BaseModal>
  );
}
