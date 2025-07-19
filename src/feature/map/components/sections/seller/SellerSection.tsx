import MapProfileCard from "@/feature/map/components/sections/seller/MapProfileCard";
import type { SellerProfile } from "@/feature/map/types/sellerType";

export default function SellerSection({ seller }: { seller: SellerProfile }) {
  return (
    <div className="px-6 py-6 rounded-lg">
      <h3 className="title-md mb-4 mt-12">판매자</h3>
      <MapProfileCard seller={seller} />
    </div>
  );
}
