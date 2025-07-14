"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  variant?: "snap" | "modal";
  snapHeight?: number;
}

export default function BaseBottomSheet({
  isOpen,
  onClose,
  children,
  variant = "modal",
  snapHeight = 500,
}: BaseBottomSheetProps) {
  const BOTTOM_OFFSET = 54;
  const HEADER_OFFSET = 54;
  const MODAL_MAX_HEIGHT = 602;

  const [sheetY, setSheetY] = useState<number | string>(
    variant === "snap" ? snapHeight : "100vh"
  );

  useEffect(() => {
    if (variant === "snap") {
      setSheetY(isOpen ? 0 : snapHeight);
    } else {
      setSheetY(isOpen ? 0 : "100vh");
    }
  }, [isOpen, variant, snapHeight]);

  return (
    <>
      {isOpen && variant === "modal" && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={onClose}
        />
      )}

      <div className="fixed inset-0 flex items-end justify-center z-30 pointer-events-none">
        <motion.div
          className="bg-white rounded-t-[20px] pointer-events-auto"
          style={{
            width: "375px",
            height:
              variant === "snap"
                ? `calc(100vh - ${HEADER_OFFSET + BOTTOM_OFFSET}px)`
                : `${MODAL_MAX_HEIGHT}px`,
            marginBottom: variant === "snap" ? `${BOTTOM_OFFSET}px` : "0px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
          animate={{ y: sheetY }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(event, info) => {
            if (info.offset.y > 100 || info.velocity.y > 500) {
              if (variant === "modal") onClose?.();
              if (variant === "snap") setSheetY(snapHeight);
            } else {
              setSheetY(0);
            }
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
