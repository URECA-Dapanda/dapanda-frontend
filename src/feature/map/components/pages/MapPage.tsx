"use client";

import MapContainer from "@/feature/map/components/sections/product/MapContainer";
import MapFloatingButtons from "@/feature/map/components/sections/product/MapFloatingButtons";
import MapBottomSheet from "@/feature/map/components/sections/product/MapBottomSheet";
import MapRegisterModal from "@/feature/map/components/sections/regist/MapRegisterModal";
import { useMapPageState } from "@/feature/map/hooks/useMapState";

export default function MapPage() {
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

  return (
    <div className="relative w-full h-[calc(100vh-112px)]">
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
        onSortChange={setSortLabel}
      />
    </div>
  );
}
