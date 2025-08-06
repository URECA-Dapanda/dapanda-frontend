"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MyDataProps } from "@feature/mypage/types/mypageTypes";

type DataUsageDonutProps = {
  unit?: string;
  data?: MyDataProps;
  color?: string;
  bgColor?: string;
  title?: string;
};

export function DataUsageDonut({
  data,
  unit = "GB",
  color = "#E6007E",
  bgColor = "#FDEDF6",
  title,
}: DataUsageDonutProps) {
  const radius = 55;
  const stroke = 15;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const percent = useMemo(
    () => (data ? Math.min(data.currentDataAmount / data.providingDataAmount, 1) : 0),
    [data]
  );

  const targetOffset = circumference - percent * circumference;

  // 초기값 0 (100% 채워진 상태)
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timeout);
  }, [targetOffset]);

  return (
    <svg height={radius * 2} width={radius * 2} className="relative shrink-0">
      {/* Background circle */}
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Foreground progress */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
        style={{
          transition: "stroke-dashoffset 1s ease-out",
        }}
      />
      {/* Center Text */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fontWeight="bold"
        fill="#35363F"
      >
        {data?.currentDataAmount ?? "-"}
        {unit}
      </text>
      <text
        x="50%"
        y="35%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fill="#35363f"
      >
        {title}
      </text>
    </svg>
  );
}
