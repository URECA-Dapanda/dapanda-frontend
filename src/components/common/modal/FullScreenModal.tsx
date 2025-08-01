"use client";

import { ReactNode } from "react";
import ModalPortal from "@/lib/ModalPortal";

interface FullScreenModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export default function FullScreenModal({ isOpen, onClose, children }: FullScreenModalProps) {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-106 bg-black/60 flex items-center justify-center w-[600px] h-[100vh] mx-auto"
        onClick={onClose}
      >
        <div className="inline-block px-4">{children}</div>
      </div>
    </ModalPortal>
  );
}
