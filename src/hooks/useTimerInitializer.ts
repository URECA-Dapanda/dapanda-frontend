"use client";

import { useEffect, useRef } from "react";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";

/**
 * 탭마다 개별적으로 타이머 실행을 관리하는 훅
 * Zustand 상태 isActive가 true면 타이머를 시작하고, false면 멈춤
 */
export const useTimerInitializer = () => {
  const { isActive, decrement } = useTimerStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        decrement();
      }, 1000);
    }

    if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, decrement]);
};
