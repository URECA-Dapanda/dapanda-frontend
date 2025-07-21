import { useQuery } from "@tanstack/react-query";
import type { SellerProfile } from "@/feature/map/types/sellerType";

export const useSellerProfileQuery = (id: string) => {
  return useQuery<SellerProfile>({
    queryKey: ["seller", id],
    queryFn: async () => {
      const res = await fetch(`/api/seller/${id}`);
      if (!res.ok) throw new Error("판매자 정보를 불러올 수 없습니다");
      return res.json();
    },
  });
};
