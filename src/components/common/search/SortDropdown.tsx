import { Button } from "@ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { memo, useCallback, useState } from "react";

function SortDropdown() {
  const [sortBy, setSortBy] = useState("time");

  const handleSearch = useCallback(() => {}, []);

  return (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-32 h-8 text-sm border-[#ffe8c6]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="time">최신순</SelectItem>
          <SelectItem value="price-low">가격 낮은순</SelectItem>
          <SelectItem value="price-high">가격 높은순</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={handleSearch}
        size="small"
        className="h-8 bg-[#119c72] hover:bg-[#0d7a5a] text-white"
      >
        검색
      </Button>
    </div>
  );
}

export default memo(SortDropdown);
