"use client";

import { useState } from "react";
import MapContainer from "@/feature/map/components/sections/product/MapContainer";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import { BottomSheetHeader, BaseBottomSheet } from "@components/common/bottomsheet";
import { MapType } from "@/feature/map/types/mapType";
import { ButtonComponent } from "@components/common/button";
import { PlusIcon, ListIcon, ChevronDown, LocateFixed } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import BaseModal from "@components/common/modal/BaseModal";
import ModalHeader from "@components/common/modal/ModalHeader";
import SelectTypeCard from "@feature/map/components/sections/regist/SelectTypeCard";
import { cn } from "@/lib/utils";

export default function MapPage() {
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [storeList, setStoreList] = useState<MapType[]>([]);
  const [sortLabel, setSortLabel] = useState("최신순");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);

  const handleGoToCurrentLocation = () => {
    if (!map || !window.naver) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = new window.naver.maps.LatLng(latitude, longitude);
          map.setCenter(currentLocation);
          map.setZoom(15);
        },
        () => {
          alert("위치 정보를 가져올 수 없습니다.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-112px)]">
      <MapContainer onStoreListUpdate={setStoreList} onMapInit={setMap} />

      <AnimatePresence>
        {!isSnapOpen && (
          <>
            {/* 등록 버튼 */}
            <motion.div
              className="absolute top-24 right-24 z-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonComponent
                variant="floatingPrimary"
                size="xl"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="w-20 h-20 mr-4" />
                등록
              </ButtonComponent>
            </motion.div>

            {/* 목록 보기 버튼 */}
            <motion.div
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonComponent
                variant="floatingOutline"
                size="xl"
                onClick={() => setIsSnapOpen(true)}
              >
                <ListIcon className="w-20 h-20 mr-4" />
                목록 보기
              </ButtonComponent>
            </motion.div>

            <motion.div
              className="absolute bottom-24 left-1/8 -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonComponent
                variant="floatingOutline"
                size="xl"
                onClick={handleGoToCurrentLocation}
              >
                <LocateFixed className="w-20 h-20" />
              </ButtonComponent>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 등록 유형 모달 */}
      <BaseModal isOpen={isModalOpen} onClose={handleClose}>
        <ModalHeader title="등록 유형 선택" onClose={handleClose} />
        <SelectTypeCard />
      </BaseModal>

      {/* 바텀시트 - 카드 목록 */}
      <BaseBottomSheet
        isOpen={isSnapOpen}
        onClose={() => setIsSnapOpen(false)}
        variant="hybrid"
        snapHeight={300}
      >
        <BottomSheetHeader />
        {/* 정렬 드롭다운 & 필터 버튼 */}
        <div className="flex justify-between items-center px-24 mb-12 mt-6">
          <div className="flex items-center gap-12">
            <UserDropdownMenu
              options={dataSortOptions}
              selectedLabel={sortLabel}
              onSelectLabel={setSortLabel}
              align="start"
            >
              <ButtonComponent variant="withIcon" size="sm" className="p-6 body-xs">
                {sortLabel}
                <ChevronDown className="w-20 h-20" />
              </ButtonComponent>
            </UserDropdownMenu>

            <ButtonComponent
              variant="outlineGray"
              size="sm"
              className={cn("p-6 body-xs", availableOnly && "bg-primary2")}
              onClick={() => setAvailableOnly((prev) => !prev)}
            >
              현재 이용 가능
            </ButtonComponent>
          </div>
        </div>
        <div className="px-24 space-y-24 mt-12">
          {storeList.map((store) => (
            <MapItemCard key={store.id} data={store} />
          ))}
        </div>
      </BaseBottomSheet>
    </div>
  );
}
