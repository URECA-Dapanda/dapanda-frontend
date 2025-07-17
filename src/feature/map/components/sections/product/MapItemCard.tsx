import { useRouter } from "next/navigation";
import { ProductItemProps } from "@feature/data/types/dataType";
import MapItemCardContent from "./MapItemContent";
import ItemCard from "@components/common/card/ItemCard";
import { MapType } from "@feature/map/types/mapType";

export default function MapItemCard({ data }: ProductItemProps<MapType>) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/map/detail?id=${data.id}`);
  };

  return (
    <div onClick={handleClick}>
      <ItemCard>
        <MapItemCardContent data={data} />
      </ItemCard>
    </div>
  );
}
