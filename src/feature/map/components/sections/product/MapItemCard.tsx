import ItemCard from "@components/common/card/ItemCard";
import MapItemCardContent from "@feature/map/components/sections/product/MapItemContent";
import type { ProductItemProps } from "@/feature/data/types/dataType";
import type { MapType } from "@/feature/map/types/mapType";

export default function MapItemCard({
  data,
  disableUseButton = false,
}: ProductItemProps<MapType> & { disableUseButton?: boolean }) {
  return (
    <ItemCard size="md">
      <MapItemCardContent data={data} disableUseButton={disableUseButton} />
    </ItemCard>
  );
}
