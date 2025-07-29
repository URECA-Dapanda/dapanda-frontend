"use client";

import { AnimatePresence, motion } from "framer-motion";
import InteractiveMap from "@/feature/map/components/sections/regist/InteractiveMap";
import MapHeaderSearchBox from "@/feature/map/components/sections/regist/MapHeaderSearchBox";
import MapSelectedInfoCard from "@/feature/map/components/sections/regist/MapSelectedInfoCard";
import { useMapLocationSelector } from "@/feature/map/hooks/useMapLocationSelector";
import { useParams } from "next/navigation";

function typeGuard(target: unknown): target is "hotspot" | "wifi" {
  if (target === "hotspot" || target === "wifi") return true;
  else return false;
}

export default function MapSelectLocationPage() {
  const type = useParams().type;

  const {
    selected,
    isSearchMode,
    searchQuery,
    searchResults,
    selectedIndex,
    initialLocation,
    setSearchQuery,
    setSelectedIndex,
    handleNext,
    handleSearchToggle,
    handleKeyDown,
    handleAddressSelect,
    handleMapLocationSelect,
  } = useMapLocationSelector(typeGuard(type) ? type : "wifi");

  return (
    <div className="relative w-full h-[calc(100vh-112px)]">
      {/* 헤더 검색 영역 */}
      <div className="absolute top-0 left-0 w-full z-20 px-24 py-20">
        <MapHeaderSearchBox
          isSearchMode={isSearchMode}
          searchQuery={searchQuery}
          onToggle={handleSearchToggle}
          onChange={(value) => {
            setSearchQuery(value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />

        <AnimatePresence>
          {isSearchMode && searchResults.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-36 mx-24 border border-gray-300 rounded-md bg-white/90 backdrop-blur-sm shadow-xl max-h-[240px] overflow-y-auto z-[100]"
            >
              {searchResults.map((item, i) => (
                <motion.li
                  key={i}
                  onClick={() => handleAddressSelect(item)}
                  className={`px-16 py-12 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                    selectedIndex === i ? "bg-gray-100" : ""
                  }`}
                >
                  <div
                    className="font-medium body-sm mb-4"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <div className="text-xs text-gray-500">{item.address}</div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* 지도 영역 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <InteractiveMap
          onLocationSelect={handleMapLocationSelect}
          initialLocation={initialLocation}
        />
        {!isSearchMode && (
          <div className="absolute top-84 left-1/2 -translate-x-1/2 px-16 py-6 bg-black-60 text-white rounded-full body-sm shadow whitespace-nowrap z-50">
            지도를 클릭하여 위치를 지정하세요
          </div>
        )}
      </div>

      {/* 선택된 주소 정보 카드 */}
      <AnimatePresence>
        {selected && <MapSelectedInfoCard selected={selected} onNext={handleNext} />}
      </AnimatePresence>
    </div>
  );
}
