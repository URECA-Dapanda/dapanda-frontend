"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  onSnapUp?: () => void;
  onSnapDown?: () => void; 
  children: ReactNode;
  variant?: "snap" | "modal";
  snapHeight?: number;
}

export default function BaseBottomSheet({
  isOpen,
  onClose,
  onSnapUp,
  onSnapDown,
  children,
  variant = "modal",
  snapHeight = 300,
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
          className="fixed inset-0 bg-black-60 z-20"
          onClick={onClose}
        />
      )}

      <motion.div className="fixed inset-0 flex items-end justify-center z-30 pointer-events-none"   
      dragConstraints={{ top: 0, bottom: 0 }}
      style={
        {
          WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
        }
      }
      onDragEnd={(event, info) => {
        if (info.offset.y > 100 || info.velocity.y > 500) {
          if (variant === "modal") {
            onClose?.();
          } else if (variant === "snap") {
            setSheetY(snapHeight);
            onSnapDown?.();
          }
        } else {
          setSheetY(0);
          if (variant === "snap") {
            onSnapUp?.();
          }
        }
      }}
      drag="y">
        <motion.div
          className="bg-white rounded-t-50 pointer-events-auto"
          style={{
            width: "375px",
            height:
              variant === "snap"
                ? `calc(100vh - ${HEADER_OFFSET + BOTTOM_OFFSET}px)`
                : `${MODAL_MAX_HEIGHT}px`,
            marginBottom: variant === "snap" ? `${BOTTOM_OFFSET}px` : "0px",
            overflowY: "auto",
          }}
          animate={{ y: sheetY }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
