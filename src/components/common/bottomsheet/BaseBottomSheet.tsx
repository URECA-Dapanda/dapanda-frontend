"use client";

import { cn } from "@lib/utils";
import { motion, PanInfo } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  onSnapUp?: () => void;
  onSnapDown?: () => void;
  children: ReactNode;
  variant?: "snap" | "modal" | "hybrid";
  snapHeight?: number | string;
  zIndex?: number;
}

export default function BaseBottomSheet({
  isOpen,
  onClose,
  onSnapUp,
  onSnapDown,
  children,
  variant = "modal",
  snapHeight = 300,
  zIndex,
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
      setSheetY(isOpen ? snapHeight : CLOSED_HEIGHT);
    } else {
      setSheetY(isOpen ? 0 : CLOSED_HEIGHT);
    }
  }, [isOpen, variant, snapHeight]);

  const threshold = 100;
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 1000;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (!variant) return;

    const shouldClose = offset > threshold && velocity > 300;
    const shouldOpenFull = offset < -threshold || velocity < -300;

    switch (variant) {
      case "modal": {
        if (shouldClose) onClose?.();
        else setSheetY(FULL_HEIGHT);
        break;
      }

      case "snap": {
        if (shouldClose) {
          setSheetY(snapHeight);
          onSnapDown?.();
        } else {
          setSheetY(FULL_HEIGHT);
          onSnapUp?.();
        }
        break;
      }

      case "hybrid": {
        if (shouldClose) {
          setSheetY(screenHeight);
          onClose?.();
        } else if (shouldOpenFull) {
          setSheetY(FULL_HEIGHT);
          onSnapUp?.();
        } else {
          setSheetY(snapHeight);
          onSnapDown?.();
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      {isOpen && variant === "modal" && (
        <div
          className="fixed inset-0 bg-black-60 z-60 w-[100dvw] lg:w-[375px] h-full mx-auto"
          onClick={onClose}
        />
      )}

      <motion.div
        className={cn(
          "fixed bottom-0 w-[100dvw] lg:w-[375px] mx-auto inset-0 flex items-end justify-center z-30 pointer-events-none overflow-y-hidden",
          isOpen || variant === "snap" ? "" : "hidden"
        )}
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "none",
          zIndex: zIndex ?? (variant === "modal" ? 99 : 30),
        }}
        onDragEnd={handleDragEnd}
        drag="y"
      >
        <motion.div
          className={`bottomSheet bg-white pointer-events-auto overflow-y-hidden ${
            (variant === "snap" || variant === "hybrid") && sheetY === 0
              ? "rounded-t-0"
              : "rounded-t-50"
          }`}
          style={{
            width: "100dvw",
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
