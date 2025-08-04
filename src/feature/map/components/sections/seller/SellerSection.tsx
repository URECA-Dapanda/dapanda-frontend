import MapProfileCard from "@/feature/map/components/sections/seller/MapProfileCard";

interface SellerSectionProps {
  sellerId: number;
  productId: string;
  isOwner?: boolean;
  memberName: string;
}

export default function SellerSection({
  sellerId,
  productId,
  isOwner,
  memberName,
}: SellerSectionProps) {
  return (
    <div className="px-6 py-6 rounded-lg">
      <h3 className="title-md mb-4 mt-12">판매자</h3>
      <MapProfileCard
        sellerId={sellerId}
        productId={productId}
        isOwner={isOwner}
        memberName={memberName}
      />
    </div>
  );
}
