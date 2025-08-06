import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import ModalHeader from "./ModalHeader";
import { Siren } from "lucide-react";
import InputComponent from "../input/InputComponent";
import { ButtonComponent } from "../button";
import BaseModal from "./BaseModal";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registReport } from "@apis/reportRequest";
import ReportCompleteModal from "./ReportCompleteModal";
import { AxiosError } from "axios";
import FullScreenModal from "./FullScreenModal";
import { showErrorToast } from "@lib/toast";

interface ReportModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  targetId?: string;
  targetName: string;
}

export default function ReportModal({ isOpen, setIsOpen, targetId, targetName }: ReportModalProps) {
  const path = usePathname().split("/");
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>("");
  const target = useMemo(() => (targetId ? targetId : path.at(-1) ?? ""), [targetId, path]);
  const targetCategory = useMemo(() => {
    switch (path.at(1)) {
      case "data":
      case "map":
        return "PRODUCT";
      case "chat":
        return "MEMBER";
      case "mypage":
        return "REVIEW";
      default:
        return "PRODUCT";
    }
  }, [path]);
  const reportMutation = useMutation({
    mutationFn: () => registReport(target, reportReason, targetCategory),
    mutationKey: ["/api/report", target],
    onSuccess: () => {
      setIsNext(true);
      setIsOpen(false);
    },
    onError: (e: AxiosError) => {
      switch (e.status) {
        case 409:
          return showErrorToast("이미 신고 처리중입니다.");
        default:
          console.error(e.status);
          return showErrorToast("신고 처리중 오류가 발생했습니다.");
      }
    },
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setReportReason("");
  }, [setIsOpen]);
  const handleReportClick = useCallback(() => {
    if (!reportReason || reportReason === "") {
      showErrorToast("신고 사유를 작성해 주세요.");
      ref.current?.focus();
    } else {
      reportMutation.mutate();
    }
  }, [reportMutation, reportReason]);

  return (
    <FullScreenModal isOpen={isOpen || isNext}>
      <BaseModal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader title="상대방 신고하기" onClose={handleClose} />
        <div className="flex flex-col justify-center items-center gap-[25px] w-full">
          <div className="rounded-full w-60 h-60 bg-error flex justify-center items-center">
            <Siren className="bg-error" size={30} color="white" />
          </div>
          <p className="title-sm">
            {targetName}님을 <span className="text-error">신고</span>하시겠어요?
          </p>
          <p className="body-sm text-gray-600 text-center">
            신고 횟수가 누적되면 <br />
            상대방의 다판다 이용이 제한돼요.
          </p>
          <div className="flex flex-col gap-8 w-full">
            <p className="w-full text-start body-sm mx-8">신고 사유를 남겨주세요!</p>
            <InputComponent
              as="textarea"
              placeholder="신고 사유를 작성해주세요."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              ref={ref}
              required={true}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-8 mt-40">
          <ButtonComponent className="flex-1" variant={"primary"} onClick={handleReportClick}>
            신고하기
          </ButtonComponent>
          <ButtonComponent className="flex-1" variant={"outlinePrimary"} onClick={handleClose}>
            취소하기
          </ButtonComponent>
        </div>
      </BaseModal>
      <ReportCompleteModal isOpen={isNext} setIsOpen={setIsNext} />
    </FullScreenModal>
  );
}
