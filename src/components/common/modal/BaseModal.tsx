"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function BaseModal({ isOpen, onClose, children, className = "" }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={cn("relative bg-white p-24 m-16 w-[327px] rounded-30", className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
