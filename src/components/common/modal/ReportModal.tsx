import { Dispatch, SetStateAction, useCallback } from "react";
import BaseModal from "./BaseModal";
import ModalHeader from "./ModalHeader";
import { SirenIcon } from "lucide-react";
import InputComponent from "../input/InputComponent";

interface ReportModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ReportModal({ isOpen, setIsOpen }: ReportModalProps) {
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader title="상대방 신고하기" onClose={handleClose} />
      <div className="flex flex-col justify-center items-center gap-[25px]">
        <SirenIcon fill="red" size={100} color="white" />
        <p className="title-sm">
          {"김데이터"}님을 <i className="text-error">신고</i>하시겠어요?
        </p>
        <p className="body-sm text-gray-600 text-center">{`신고 횟수가 누적되면 
        상대방의 다판다 이용이 제한돼요.`}</p>
        <p className="w-full text-start body-sm">신고 사유를 남겨주세요!</p>
        <InputComponent as="textarea" placeholder="신고 사유를 작성해주세요." />
      </div>
    </BaseModal>
  );
}
