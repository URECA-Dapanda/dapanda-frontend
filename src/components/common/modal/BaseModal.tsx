"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "center" | "bottom";
  className?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  position = "center",
  className = "",
}: BaseModalProps) {
  if (!isOpen) return null;

  const positionStyle =
    position === "center" ? "items-center justify-center" : "items-end justify-center";

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex ${positionStyle}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.95, y: position === "bottom" ? 100 : 0, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: position === "bottom" ? 100 : 0, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={`relative bg-white rounded-3xl p-6 m-4 w-[327px] ${className}`}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
