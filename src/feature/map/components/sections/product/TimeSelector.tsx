"use client";

import { useState, useRef, useEffect } from "react";

interface Time {
  hour: string;
  minute: string;
  period: "AM" | "PM";
}

interface TimeSelectorProps {
  label: string;
  time: Time;
  onChange: (newTime: Time) => void;
  type: "start" | "end";
}

export default function TimeSelector({ label, time, onChange }: TimeSelectorProps) {
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
    const selected = temp[field];

    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 bg-white border border-gray-300 rounded-12 shadow-lg z-50 mt-4 min-w-[120px]"
      >
        <div className="max-h-144 overflow-y-auto p-4 space-y-4">
          {items.map((item, idx) => {
            const isSelected = item === selected;
            return (
              <button
                key={idx}
                onClick={() => setTemp((prev) => ({ ...prev, [field]: item }))}
                className={`w-full px-8 py-6 text-sm rounded-6 text-left body-sm ${
                  isSelected
                    ? "bg-primary-50 border border-primary text-primary"
                    : "bg-white hover:bg-gray-100 border border-transparent text-black"
                }`}
              >
                {typeof item === "number" ? item.toString().padStart(2, "0") : item}
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
    <div className="flex flex-col items-center">
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
