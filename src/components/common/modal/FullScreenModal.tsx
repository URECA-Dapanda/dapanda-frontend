"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalPortal from "@/lib/ModalPortal";

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function FullScreenModal({ isOpen, onClose, children }: FullScreenModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="inline-block px-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}
