"use client";
import { memo, useState } from "react";
import SearchBar from "./search/SearchBar";
import SortDropdown from "./search/SortDropdown";
import AdvancedFilters from "./search/AdvancedFilters";

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
