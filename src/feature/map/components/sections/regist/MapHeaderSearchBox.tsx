"use client";

import { useEffect, useRef } from "react";
import { MapPin, Search, X } from "lucide-react";

interface MapHeaderSearchBoxProps {
  isSearchMode: boolean;
  searchQuery: string;
  onToggle: () => void;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function MapHeaderSearchBox({
  isSearchMode,
  searchQuery,
  onToggle,
  onChange,
  onKeyDown,
}: MapHeaderSearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchMode) inputRef.current?.focus();
  }, [isSearchMode]);

  return (
    <div className="absolute top-0 left-0 w-full z-20 bg-white px-24 py-20">
      <div className="flex items-center justify-between h-36 rounded-md border border-gray-300 px-16">
        <MapPin className="w-24 h-24 text-gray-400" />

        {!isSearchMode ? (
          <span
            onClick={onToggle}
            className="body-sm text-gray-400 text-center flex-1 cursor-pointer whitespace-nowrap"
          >
            위치 검색..
          </span>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="주소를 입력하세요"
            className="flex-1 text-sm outline-none px-8 py-6"
          />
        )}

        {!isSearchMode ? (
          <Search className="w-24 h-24 text-gray-400 cursor-pointer" onClick={onToggle} />
        ) : (
          <button onClick={onToggle} className="p-4 hover:bg-gray-100 rounded-md">
            <X className="w-20 h-20" />
          </button>
        )}
      </div>
    </div>
  );
}
