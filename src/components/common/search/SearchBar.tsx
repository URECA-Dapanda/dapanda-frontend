"use client";
import { ChangeEvent, Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

function SearchBar({ setShowFilters }: { setShowFilters: Dispatch<SetStateAction<boolean>> }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="데이터 검색..."
          value={searchQuery}
          onChange={handleChange}
          className="pl-10 h-10 border-[#ffe8c6] focus:border-[#ffd964]"
        />
      </div>
      <Button
        variant="ghost"
        size="small"
        onClick={handleClick}
        className="h-10 px-3 border-[#ffe8c6] text-[#119c72]"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default memo(SearchBar);
