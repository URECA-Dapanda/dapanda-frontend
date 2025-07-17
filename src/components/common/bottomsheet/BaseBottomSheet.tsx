"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  onSnapUp?: () => void;
  onSnapDown?: () => void;
  children: ReactNode;
  variant?: "snap" | "modal" | "hybrid"; // ✅ hybrid 추가
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
  const FULL_HEIGHT = 0;
  const CLOSED_HEIGHT = typeof window !== "undefined" ? window.innerHeight : "100vh";

  const [sheetY, setSheetY] = useState<number | string>(
    variant === "snap" ? snapHeight : CLOSED_HEIGHT
  );

  useEffect(() => {
    if (variant === "snap") {
      setSheetY(isOpen ? 0 : snapHeight);
    } else if (variant === "hybrid") {
      setSheetY(isOpen ? snapHeight : CLOSED_HEIGHT); // ✅ hybrid: 시작은 snapHeight
    } else {
      setSheetY(isOpen ? 0 : CLOSED_HEIGHT);
    }
  }, [isOpen, variant, snapHeight]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (variant === "modal") {
      if (offset > 100 || velocity > 500) {
        onClose?.();
      } else {
        setSheetY(FULL_HEIGHT);
      }
    } else if (variant === "snap") {
      if (offset > 100 || velocity > 500) {
        setSheetY(snapHeight);
        onSnapDown?.();
      } else {
        setSheetY(FULL_HEIGHT);
        onSnapUp?.();
      }
    } else if (variant === "hybrid") {
      // ✅ hybrid 로직
      const threshold = 100;
      const screenHeight = window.innerHeight;

      if (offset > threshold && velocity > 300) {
        // 아래로 빠르게 → 닫힘
        setSheetY(screenHeight);
        onClose?.();
      } else if (offset < -threshold || velocity < -300) {
        // 위로 빠르게 → 전체 열기
        setSheetY(FULL_HEIGHT);
        onSnapUp?.();
      } else {
        // 중간 → 절반 유지
        setSheetY(snapHeight);
      }
    }
  };

  return (
    <>
      {isOpen && variant === "modal" && (
        <div className="fixed inset-0 bg-black-60 z-20" onClick={onClose} />
      )}

      <motion.div
        className="fixed inset-0 flex items-end justify-center z-30 pointer-events-none"
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "none",
        }}
        onDragEnd={handleDragEnd}
        drag="y"
      >
        <motion.div
          className={`bg-white pointer-events-auto ${
            (variant === "snap" || variant === "hybrid") && sheetY === 0
              ? "rounded-t-0"
              : "rounded-t-50"
          }`}
          style={{
            width: "375px",
            height:
              variant === "snap" || variant === "hybrid"
                ? `calc(100vh - ${HEADER_OFFSET + BOTTOM_OFFSET}px)`
                : `${MODAL_MAX_HEIGHT}px`,
            marginBottom: variant === "snap" || variant === "hybrid" ? `${BOTTOM_OFFSET}px` : "0px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            touchAction: "none",
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
