import { useCallback, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  pricePer10min: number;
  memberName: string;
  memberId: number;
  imageUrls?: string[];
}

export const useProductCache = () => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const isFetchingProduct = useRef(false);

  const createProductInfo = useCallback(
    (productData: {
      productId: number;
      itemId: number;
      title: string;
      price: number;
      memberName: string;
      memberId: number;
      imageUrls?: string[];
    }): ProductInfo => ({
      productId: productData.productId,
      itemId: productData.itemId,
      title: productData.title,
      pricePer10min: productData.price,
      memberName: productData.memberName,
      memberId: productData.memberId,
      imageUrls: productData.imageUrls,
    }),
    []
  );

  const fetchProductWithCache = useCallback(
    async (productIdStr: string, abortController?: AbortController) => {
      if (isFetchingProduct.current) {
        return;
      }

      isFetchingProduct.current = true;
      setIsLoadingProduct(true);

      try {
        const productData = await getMapDetailById(productIdStr);

        if (abortController?.signal.aborted) return;

        const productInfo = createProductInfo(productData);
        setProduct(productInfo);
      } catch (error) {
        if (!abortController?.signal.aborted) {
          console.debug("상품 정보 가져오기 실패:", error);
        }
      } finally {
        setIsLoadingProduct(false);
        isFetchingProduct.current = false;
      }
    },
    [createProductInfo]
  );

  const clearCache = useCallback(() => {
    isFetchingProduct.current = false;
  }, []);

  return {
    product,
    setProduct,
    isLoadingProduct,
    fetchProductWithCache,
    clearCache,
  };
};

// React Query를 사용한 상품 정보 훅 (권장)
export const useProductInfo = (productId: string | null) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getMapDetailById(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 메모리에 유지
  });
};
