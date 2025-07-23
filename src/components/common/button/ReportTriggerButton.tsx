"use client";

import { Siren } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "@lib/utils";
import ReportModal from "../modal/ReportModal";

export default function ReportTriggerButton() {
  const [reportOpen, setReportOpen] = useState(false);

  const handleReportOpen = useCallback(() => setReportOpen(true), []);

  return (
    <>
      <button
        className={cn(
          "rounded-full w-[25px] h-[25px] flex justify-center items-center",
          "bg-white text-error"
        )}
        onClick={handleReportOpen}
      >
        <Siren size={12} className={cn("bg-white text-error")} />
      </button>
      <ReportModal isOpen={reportOpen} setIsOpen={setReportOpen} />
    </>
  );
}
