"use client";
import React, { useRef, useState, useCallback } from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

export interface CustomRatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  onChange?: (value: number | null) => void;
  size?: number;
}

/**
 * 사용자 정의 Rating 컴포넌트
 * - 드래그, 클릭으로 별점 선택 가능
 * - 0.5 단위 소수점 별점 지원
 * - readOnly 모드 지원
 */
export default function CustomRating({
  value,
  defaultValue = 0,
  max = 5,
  precision = 0.5,
  readOnly = false,
  onChange,
  size = 24,
}: CustomRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  const displayValue = value ?? internalValue;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (readOnly || !ref.current) return;

      const { left, width } = ref.current.getBoundingClientRect();
      const percent = (e.clientX - left) / width;
      let newHover = Math.round((percent * max) / precision) * precision;
      newHover = Math.min(max, Math.max(precision, newHover));
      setHoverValue(newHover);
    },
    [max, precision, readOnly]
  );

  const handleClick = () => {
    if (readOnly || hoverValue == null) return;
    onChange?.(hoverValue);
    setInternalValue(hoverValue);
  };

  const handleLeave = () => {
    setHoverValue(null);
  };

  // 위의 CustomRating 코드에서 이 부분만 교체

  const renderIcon = (i: number) => {
    const active = hoverValue ?? displayValue;
    const iconValue = (i + 1) * precision;

    if (iconValue <= active) {
      return <Star size={size} fill="currentColor" />;
    }

    if (iconValue - precision < active) {
      // 0.5점일 때 반만 채워진 아이콘
      return (
        <div style={{ position: "relative", display: "inline-block", width: size }}>
          <div
            style={{
              width: "50%",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Star size={size} fill="currentColor" />
          </div>
          <StarOff size={size} />
        </div>
      );
    }

    return <StarOff size={size} />;
  };

  const iconCount = Math.floor(max / precision);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        gap: 2,
        cursor: readOnly ? "default" : "pointer",
        fontSize: size,
      }}
    >
      {Array.from({ length: iconCount }, (_, i) => (
        <span key={i}>{renderIcon(i)}</span>
      ))}
    </div>
  );
}
