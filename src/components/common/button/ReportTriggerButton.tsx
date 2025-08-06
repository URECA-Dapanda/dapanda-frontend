"use client";

import { Siren } from "lucide-react";
import { useCallback, useState } from "react";
import ReportModal from "@components/common/modal/ReportModal";

import { cn } from "@lib/utils";

interface ReportTriggerButtonProps {
  targetName: string;
}

export default function ReportTriggerButton({ targetName }: ReportTriggerButtonProps) {
  const [reportOpen, setReportOpen] = useState(false);

  const handleReportOpen = useCallback(() => setReportOpen(true), []);

  return (
    <>
      <button
        className={cn(
          "rounded-full w-[25px] h-[25px] flex justify-center items-center hover:cursor-pointer",
          "bg-white text-error"
        )}
        onClick={handleReportOpen}
      >
        <Siren size={12} className={cn("bg-white text-error")} />
      </button>
      <ReportModal isOpen={reportOpen} setIsOpen={setReportOpen} targetName={targetName} />
    </>
  );
}
