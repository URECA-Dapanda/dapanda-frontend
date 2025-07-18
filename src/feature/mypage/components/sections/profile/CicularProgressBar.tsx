"use client";

import React, { useEffect, useState } from "react";

type DataUsageDonutProps = {
  current: number;
  total: number;
  unit?: string;
};

export function DataUsageDonut({ current: used, total, unit = "GB" }: DataUsageDonutProps) {
  const radius = 50;
  const stroke = 15;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const percent = Math.min(used / total, 1);

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
    <svg height={radius * 2} width={radius * 2} className="relative">
      {/* Background circle */}
      <circle
        stroke="#FDEDF6"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Foreground progress */}
      <circle
        stroke="#E6007E"
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
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fontWeight="bold"
        fill="#35363F"
      >
        {used}
        {unit}
      </text>
    </svg>
  );
}
