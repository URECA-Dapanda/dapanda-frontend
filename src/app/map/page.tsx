"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapContainer from "@/feature/map/components/sections/product/MapContainer";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import { BottomSheetHeader, BaseBottomSheet } from "@components/common/bottomsheet";
import { MapType } from "@/feature/map/types/mapType";
import { ButtonComponent } from "@components/common/button";
import { PlusIcon, ListIcon, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { cn } from "@/lib/utils";

export default function MapPage() {
  const router = useRouter();
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [storeList, setStoreList] = useState<MapType[]>([]);
  const [sortLabel, setSortLabel] = useState("최신순");
  const [availableOnly, setAvailableOnly] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-56px)]">
      <MapContainer onStoreListUpdate={setStoreList} />

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
                onClick={() => router.push("/map/regist/hotspot")}
              >
                <PlusIcon className="w-20 h-20 mr-4" />
                등록
              </ButtonComponent>
            </motion.div>

            {/* 목록 보기 버튼 */}
            <motion.div
              className="absolute bottom-80 left-1/2 -translate-x-1/2 z-50"
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
          </>
        )}
      </AnimatePresence>

      {/* 바텀시트 - 카드 목록 */}
      <BaseBottomSheet
        isOpen={isSnapOpen}
        onClose={() => setIsSnapOpen(false)} // 닫기 동작 시 상태 업데이트
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
