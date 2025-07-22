import MapProfileCard from "@/feature/map/components/sections/seller/MapProfileCard";

interface SellerSectionProps {
  productId: string;
  memberName: string;
  rating: number;
  reviewCount: number;
}

export default function SellerSection({
  productId,
  memberName,
  rating,
  reviewCount,
}: SellerSectionProps) {
  return (
    <div className="px-6 py-6 rounded-lg">
      <h3 className="title-md mb-4 mt-12">판매자</h3>
      <MapProfileCard
        productId={productId}
        memberName={memberName}
        rating={rating}
        reviewCount={reviewCount}
      />
    </div>
  );
}
