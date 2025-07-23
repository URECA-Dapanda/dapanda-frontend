import { useRouter } from "next/navigation";
import ItemCard from "@components/common/card/ItemCard";
import MapItemCardContent from "@/feature/map/components/sections/product/MapItemContent";
import type { ProductItemProps } from "@/feature/data/types/dataType";
import type { MapType } from "@/feature/map/types/mapType";

export default function MapItemCard({ data }: ProductItemProps<MapType>) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/map/${data.id}`);
  };

  return (
    <div onClick={handleClick}>
      <ItemCard size="md">
        <MapItemCardContent data={data} />
      </ItemCard>
    </div>
  );
}
