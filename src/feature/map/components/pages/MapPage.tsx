"use client";

import { useEffect, useState } from "react";
import MapContainer from "@/feature/map/components/sections/product/MapContainer";
import MapFloatingButtons from "@/feature/map/components/sections/product/MapFloatingButtons";
import MapBottomSheet from "@/feature/map/components/sections/product/MapBottomSheet";
import MapRegisterModal from "@/feature/map/components/sections/regist/MapRegisterModal";
import { useMapPageState } from "@feature/map/hooks/state/useMapState";
import { getMapList } from "@/feature/map/api/mapRequest";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { createDataSortOptions, sortOptionMap } from "@/components/common/dropdown/dropdownConfig";
import type { DropdownOption } from "@/components/common/dropdown/dropdown.types";
import { useInitialMapFetch } from "@feature/map/hooks/map/useMapIntialMapFetch";

export default function MapPage() {
  useInitialMapFetch();

  const {
    isModalOpen,
    isSnapOpen,
    setIsModalOpen,
    setIsSnapOpen,
    availableOnly,
    setAvailableOnly,
    sortLabel,
    setSortLabel,
  } = useMapPageState();

  const setStoreList = useMapStore((state) => state.setStoreList);
  const myPosition = useMapStore((state) => state.myPosition);
  const [sortOptions, setSortOptions] = useState<DropdownOption[]>([]);

  const handleSortChange = async (label: string) => {
    setSortLabel(label);
    const sortOption = sortOptionMap[label];
    if (!myPosition) return;

    const result = await getMapList({
      size: 20,
      latitude: myPosition.lat() ?? 37.5665,
      longitude: myPosition.lng() ?? 126.978,
      productSortOption: sortOption,
      open: availableOnly,
    });
    setStoreList(result.items);
  };

  useEffect(() => {
    const options = createDataSortOptions(handleSortChange);
    setSortOptions(options);
  }, [availableOnly]);

  return (
    <div className="relative w-full h-main-safe pt-safe-top pb-safe-bottom">
      <MapContainer />
      <MapFloatingButtons
        onOpenModal={() => setIsModalOpen(true)}
        onOpenSheet={() => setIsSnapOpen(true)}
        isSnapOpen={isSnapOpen}
      />
      <MapRegisterModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <MapBottomSheet
        open={isSnapOpen}
        onClose={() => setIsSnapOpen(false)}
        availableOnly={availableOnly}
        setAvailableOnly={setAvailableOnly}
        sortLabel={sortLabel}
        onSortChange={handleSortChange}
        sortOptions={sortOptions}
      />
    </div>
  );
}
