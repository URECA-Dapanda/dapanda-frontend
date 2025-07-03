"use client";
import { memo, useState } from "react";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import AdvancedFilters from "./AdvancedFilters";

function SearchFilter() {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <SearchBar setShowFilters={setShowFilters} />

      {/* Sort Dropdown */}
      <SortDropdown />

      {/* Advanced Filters */}
      <AdvancedFilters showFilters={showFilters} />
    </div>
  );
}

export default memo(SearchFilter);
