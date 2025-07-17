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
        className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 min-w-[120px]"
      >
        <div className="max-h-48 overflow-y-auto p-1">
          {items.map((item, idx) => {
            const isSelected = item === selected;
            return (
              <button
                key={idx}
                onClick={() => setTemp((prev) => ({ ...prev, [field]: item }))}
                className={`w-full p-2 text-sm font-medium rounded mb-1 text-left ${
                  isSelected
                    ? "bg-blue-50 border border-blue-500 text-blue-600"
                    : "bg-white hover:bg-gray-50 border border-transparent"
                }`}
              >
                {typeof item === "number" ? item.toString().padStart(2, "0") : item}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 p-3 border-t border-gray-200">
          <button
            onClick={() => setActiveField(null)}
            className="px-4 py-2 body-sm font-medium text-blue-600 hover:text-blue-700"
          >
            취소
          </button>
          <button
            onClick={confirm}
            className="px-4 py-2 body-sm font-medium text-blue-600 hover:text-blue-700"
          >
            확인
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="flex items-center gap-1">
        {/* Time Display */}
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 relative">
          <button
            onClick={() => openDropdown("hour")}
            className="text-lg font-medium text-gray-900 hover:text-blue-500 min-w-[24px] text-center"
          >
            {time.hour}
          </button>
          <span className="mx-1 text-gray-500">:</span>
          <button
            onClick={() => openDropdown("minute")}
            className="text-lg font-medium text-gray-900 hover:text-blue-500 min-w-[24px] text-center"
          >
            {time.minute}
          </button>
          {renderDropdown("hour", hours)}
          {renderDropdown("minute", minutes)}
        </div>

        {/* AM/PM Buttons */}
        <div className="flex flex-col gap-1 ml-2">
          <button
            onClick={() => onChange({ ...time, period: "AM" })}
            className={`px-2 py-1 text-xs font-medium rounded ${
              time.period === "AM"
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            AM
          </button>
          <button
            onClick={() => onChange({ ...time, period: "PM" })}
            className={`px-2 py-1 text-xs font-medium rounded ${
              time.period === "PM"
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
}
