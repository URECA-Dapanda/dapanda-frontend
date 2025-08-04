import { useCallback, useRef, useState } from "react";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  pricePer10min: number;
  memberName: string;
  memberId: number;
}

export const useProductCache = () => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const productCache = useRef<Map<string, ProductInfo>>(new Map());
  const isFetchingProduct = useRef(false);

  const createProductInfo = useCallback(
    (productData: {
      productId: number;
      itemId: number;
      title: string;
      price: number;
      memberName: string;
      memberId: number;
    }): ProductInfo => ({
      productId: productData.productId,
      itemId: productData.itemId,
      title: productData.title,
      pricePer10min: productData.price,
      memberName: productData.memberName,
      memberId: productData.memberId,
    }),
    []
  );

  const fetchProductWithCache = useCallback(
    async (productIdStr: string, abortController?: AbortController) => {
      if (productCache.current.has(productIdStr)) {
        const cachedProduct = productCache.current.get(productIdStr)!;
        setProduct(cachedProduct);
        setIsLoadingProduct(false);
        return;
      }

      if (isFetchingProduct.current) {
        return;
      }

      isFetchingProduct.current = true;
      setIsLoadingProduct(true);

      try {
        const productData = await getMapDetailById(productIdStr);

        if (abortController?.signal.aborted) return;

        const productInfo = createProductInfo(productData);

        productCache.current.set(productIdStr, productInfo);
        setProduct(productInfo);
      } catch (error) {
        if (!abortController?.signal.aborted) {
          console.error("상품 정보 가져오기 실패:", error);
        }
      } finally {
        setIsLoadingProduct(false);
        isFetchingProduct.current = false;
      }
    },
    [createProductInfo]
  );

  const clearCache = useCallback(() => {
    productCache.current.clear();
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
