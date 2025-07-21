"use client";

import { ChevronDown } from "lucide-react";
import { BottomSheetHeader, BaseBottomSheet } from "@components/common/bottomsheet";
import { ButtonComponent } from "@components/common/button";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";

import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  availableOnly: boolean;
  setAvailableOnly: (v: boolean) => void;
  sortLabel: string;
  onSortChange: (v: string) => void;
}

export default function MapBottomSheet({
  open,
  onClose,
  availableOnly,
  setAvailableOnly,
  sortLabel,
  onSortChange,
}: Props) {
  const { storeList } = useMapStore();

  return (
    <BaseBottomSheet isOpen={open} onClose={onClose} variant="hybrid" snapHeight={300}>
      <BottomSheetHeader />
      <div className="flex justify-between items-center px-24 mb-12 mt-6">
        <div className="flex items-center gap-12">
          <UserDropdownMenu
            options={dataSortOptions}
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

      <div className="px-24 space-y-24 mt-12">
        {storeList.map((store) => (
          <MapItemCard key={store.id} data={store} />
        ))}
      </div>
    </BaseBottomSheet>
  );
}
