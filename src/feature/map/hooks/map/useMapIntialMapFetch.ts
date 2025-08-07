import { useEffect } from "react";
import { getMapList } from "@/feature/map/api/mapRequest";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { useMapPageState } from "@feature/map/hooks/state/useMapState";
import { sortOptionMap } from "@/components/common/dropdown/dropdownConfig";

// hooks/useInitialMapFetch.ts
export const useInitialMapFetch = () => {
  const { myPosition, setStoreList } = useMapStore();
  const { sortLabel, availableOnly } = useMapPageState();

  useEffect(() => {
    if (!myPosition) return;
    const fetch = async () => {
      const result = await getMapList({
        size: 20,
        latitude: myPosition.lat(),
        longitude: myPosition.lng(),
        productSortOption: sortOptionMap[sortLabel],
        open: availableOnly,
      });
      setStoreList(result.items);
    };
    fetch();
  }, [myPosition, sortLabel, availableOnly]);
};
