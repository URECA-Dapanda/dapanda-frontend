import MapListVirtual from "@/feature/map/components/sections/list/MapListVirtual";
import SelectTypeCard from "@/feature/map/components/sections/regist/SelectTypeCard";

export default function MapPageContent() {
  return (
    <div className="space-y-32">
      <MapListVirtual />
      <SelectTypeCard />
    </div>
  );
}
