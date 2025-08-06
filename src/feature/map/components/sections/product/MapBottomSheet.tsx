"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { BaseBottomSheet } from "@components/common/bottomsheet";
import { ButtonComponent } from "@components/common/button";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import type { DropdownOption } from "@/components/common/dropdown/dropdown.types";
import { useVirtualizedInfiniteQuery } from "@/hooks/useVirtualizedInfiniteQuery";
import { getMapList } from "@/feature/map/api/mapRequest";
import type { MapType } from "@/feature/map/types/mapType";
import { sortOptionMap } from "@/components/common/dropdown/dropdownConfig";

import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  availableOnly: boolean;
  setAvailableOnly: (v: boolean) => void;
  sortLabel: string;
  onSortChange: (v: string) => void;
  sortOptions: DropdownOption[];
}

export default function MapBottomSheet({
  open,
  onClose,
  availableOnly,
  setAvailableOnly,
  sortLabel,
  onSortChange,
  sortOptions,
}: Props) {
  const { myPosition } = useMapStore();
  const [isSnapUp, setIsSnapUp] = useState<boolean>(false);

  const handleSnapUp = useCallback(() => {
    setIsSnapUp(true);
  }, []);
  const handleSnapDown = useCallback(() => {
    setIsSnapUp(false);
  }, []);

  const { parentRef, rowVirtualizer, flatItems } = useVirtualizedInfiniteQuery<MapType>({
    queryKey: ["mapList", String(myPosition?.lat()), String(myPosition?.lng()), sortLabel] as const,
    queryFn: ({ pageParam }) =>
      getMapList({
        cursorId: pageParam as number | undefined,
        size: 10,
        latitude: myPosition?.lat() ?? 37.5665,
        longitude: myPosition?.lng() ?? 126.978,
        productSortOption: sortOptionMap[sortLabel],
        open: availableOnly ? true : undefined,
      }),
    getNextPageParam: (lastPage) => {
      // 🔽 수정 포인트
      if (availableOnly && lastPage.items.length === 0) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    estimateSize: () => 160,
  });

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
  }, [sortLabel, availableOnly]);

  const visibleItems = availableOnly ? flatItems.filter((item) => item.open) : flatItems;

  return (
    <BaseBottomSheet
      isOpen={open}
      onClose={onClose}
      onSnapDown={handleSnapDown}
      onSnapUp={handleSnapUp}
      variant="hybrid"
      snapHeight={300}
      zIndex={101}
    >
      <div className="flex justify-between items-center px-24 mb-12 mt-16">
        <div className="flex items-center gap-12">
          <UserDropdownMenu
            options={sortOptions}
            selectedLabel={sortLabel}
            onSelectLabel={onSortChange}
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
            onClick={() => setAvailableOnly(!availableOnly)}
          >
            현재 이용 가능
          </ButtonComponent>
        </div>
      </div>

      {/* 가상 리스트 렌더링 영역 */}
      <div
        ref={parentRef}
        className={cn(
          "overflow-y-auto px-24 pb-[54px]",
          isSnapUp
            ? "h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-107px-60px)]"
            : "h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-107px-300px)]"
        )}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = visibleItems[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="mb-24">
                  <MapItemCard data={item} disableUseButton={!item?.open && !availableOnly} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BaseBottomSheet>
  );
}
