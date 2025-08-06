"use client";

import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@lib/utils";

interface MonthNavigatorProps {
  value: Dayjs;
  onChange: (newValue: Dayjs) => void;
}

export default function MonthPicker({ value, onChange }: MonthNavigatorProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const now = dayjs();

  const goToPrevMonth = () => onChange(value.subtract(1, "month"));
  const goToNextMonth = () => onChange(value.add(1, "month"));
  const handleDateClick = () => setIsPickerOpen(true);

  const isNextDisabled =
    value.year() > now.year() || (value.year() === now.year() && value.month() >= now.month());

  return (
    <div className="flex items-center justify-center gap-4 py-2 relative">
      <button onClick={goToPrevMonth} className="hover:cursor-pointer">
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button onClick={handleDateClick} className="text-lg font-semibold hover:cursor-pointer">
        {value.format("YYYY년 MM월")}
      </button>

      <button
        onClick={goToNextMonth}
        disabled={isNextDisabled}
        className={cn(isNextDisabled ? "text-gray-500 hover:none" : "hover:cursor-pointer")}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {isPickerOpen && (
        <YearMonthPicker
          initial={value}
          onClose={() => setIsPickerOpen(false)}
          onSelect={(selected) => {
            onChange(selected);
            setIsPickerOpen(false);
          }}
        />
      )}
    </div>
  );
}

interface Props {
  initial: Dayjs;
  onSelect: (value: Dayjs) => void;
  onClose: () => void;
}

export function YearMonthPicker({ initial, onSelect, onClose }: Props) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState(initial.year());
  const [month, setMonth] = useState(initial.month());

  const now = dayjs();
  const currentYear = now.year();
  const currentMonth = now.month(); // 0~11

  const handleSelectMonth = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      const target = Number(e.currentTarget.value);
      setMonth(target);
      onSelect(dayjs().year(year).month(target));
    },
    [year]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={pickerRef}
      className="absolute top-full mt-2 bg-white border shadow p-4 z-50 rounded-md"
    >
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setYear((y) => y - 1)}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold">{year}년</span>
        <button onClick={() => year < currentYear && setYear((y) => y + 1)}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }, (_, i) => {
          const isFuture = year > currentYear || (year === currentYear && i > currentMonth);
          const isSelected = i === month && year === initial.year();

          return (
            <button
              key={i}
              value={i}
              onClick={handleSelectMonth}
              className={`p-2 rounded text-sm border ${
                isSelected ? "bg-blue-100 font-bold" : "hover:bg-gray-100"
              } ${isFuture ? "text-gray-400 cursor-not-allowed" : ""}`}
              disabled={isFuture}
            >
              {i + 1}월
            </button>
          );
        })}
      </div>

      <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline">
        닫기
      </button>
    </div>
  );
}
