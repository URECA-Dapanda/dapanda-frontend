"use client";

import { useState, useRef, useEffect } from "react";
import { compareTimesWithWraparound } from "@/lib/time";
import type { Time } from "@type/Time";

import { cn } from "@lib/utils";

interface TimeSelectorProps {
  label: string;
  time: Time;
  onChange: (newTime: Time) => void;
  type: "start" | "end";
  minTime?: Time;
  maxTime?: Time;
}

export default function TimeSelector({
  label,
  time,
  onChange,
  minTime,
  maxTime,
}: TimeSelectorProps) {
  const [activeField, setActiveField] = useState<"hour" | "minute" | "period" | null>(null);
  const [temp, setTemp] = useState({ hour: 0, minute: 0, period: "AM" as "AM" | "PM" });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  useEffect(() => {
    if (!activeField) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeField]);

  const openDropdown = (field: "hour" | "minute" | "period") => {
    setActiveField(field);
    setTemp({
      hour: parseInt(time.hour),
      minute: parseInt(time.minute),
      period: time.period,
    });
  };

  const confirm = () => {
    onChange({
      hour: temp.hour.toString().padStart(2, "0"),
      minute: temp.minute.toString().padStart(2, "0"),
      period: temp.period,
    });
    setActiveField(null);
  };

  const renderDropdown = (field: "hour" | "minute" | "period", items: (number | string)[]) => {
    if (activeField !== field) return null;

    const selectedValue = (() => {
      if (field === "hour" || field === "minute") {
        return String(temp[field]).padStart(2, "0");
      }
      return temp[field];
    })();

    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 bg-white border border-gray-300 rounded-12 shadow-lg z-[9999] mt-4 min-w-[120px] max-h-144 overflow-y-auto scroll-visible"
      >
        <div className="p-4 space-y-4">
          {items.map((item, idx) => {
            const itemStr = typeof item === "number" ? String(item).padStart(2, "0") : item;

            const rawTemp = {
              ...temp,
              [field]: typeof item === "number" ? item : parseInt(item, 10),
            };

            const tempTime: Time = {
              hour: String(rawTemp.hour).padStart(2, "0"),
              minute: String(rawTemp.minute).padStart(2, "0"),
              period: rawTemp.period,
            };

            const inMinRange =
              !minTime || compareTimesWithWraparound(tempTime, minTime, minTime) >= 0;
            const inMaxRange =
              !maxTime || compareTimesWithWraparound(tempTime, maxTime, minTime ?? maxTime) <= 0;

            const disabled = !inMinRange || !inMaxRange;

            const isSelected = itemStr === selectedValue;

            return (
              <button
                key={idx}
                onClick={() => {
                  if (disabled) return;
                  setTemp((prev) => ({
                    ...prev,
                    [field]: typeof item === "number" ? item : parseInt(item, 10),
                  }));
                }}
                disabled={disabled}
                className={cn(
                  "w-full px-8 py-6 text-sm rounded-6 text-left body-sm",
                  disabled
                    ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                    : isSelected
                    ? "bg-primary-50 border border-primary text-primary"
                    : "hover:bg-gray-100 border border-transparent text-black"
                )}
              >
                {itemStr}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between px-16 py-12 border-t border-gray-300">
          <button
            onClick={() => setActiveField(null)}
            className="body-sm text-primary hover:underline"
          >
            취소
          </button>
          <button onClick={confirm} className="body-sm text-primary font-semibold hover:underline">
            확인
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center z-0">
      <div className="caption-md text-gray-600 mb-4">{label}</div>
      <div className="flex items-center gap-8">
        {/* 시간 선택 영역 */}
        <div className="flex items-center bg-white border border-gray-300 rounded-12 px-12 py-8 relative">
          <button
            onClick={() => openDropdown("hour")}
            className="text-lg text-black hover:text-primary min-w-[24px]"
          >
            {time.hour}
          </button>
          <span className="mx-4 text-gray-500">:</span>
          <button
            onClick={() => openDropdown("minute")}
            className="text-lg text-black hover:text-primary min-w-[24px]"
          >
            {time.minute}
          </button>

          {renderDropdown("hour", hours)}
          {renderDropdown("minute", minutes)}
        </div>

        {/* AM / PM 선택 */}
        <div className="flex flex-col gap-4">
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              onClick={() => onChange({ ...time, period: p })}
              className={`px-8 py-4 rounded-6 caption-md ${
                time.period === p
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
