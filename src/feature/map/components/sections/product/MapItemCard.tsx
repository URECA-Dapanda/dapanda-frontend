import { ProductItemProps } from "@feature/data/types/dataType";
import MapItemCardContent from "./MapItemContent";
import ItemCard from "@components/common/card/ItemCard";
import { MapType } from "@feature/map/types/mapType";

export default function MapItemCard({ data }: ProductItemProps<MapType>) {
  return (
    <ItemCard>
      <MapItemCardContent data={data} />
    </ItemCard>
  );
}
