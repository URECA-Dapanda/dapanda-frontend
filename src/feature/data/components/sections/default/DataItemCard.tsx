"use client";

import { memo, useCallback } from "react";
import DataItemContent from "@feature/data/components/pages/DataItemContent";
import { DataType, ProductItemProps } from "@feature/data/types/dataType";
import { useRouter } from "next/navigation";
import ItemCard from "@components/common/card/ItemCard";

interface DataItemCardProps extends Partial<ProductItemProps<DataType>> {
  type: "default" | "scrap";
  size?: "sm" | "md";
}

function DataItemCard({ data, type, size = "md" }: DataItemCardProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    console.log(type, data);
    if (data) router.push(`/data/${data.productId}`);
  }, [data, type, router]);

  return (
    <ItemCard handleClick={handleClick} size={size}>
      <DataItemContent data={data} />
    </ItemCard>
  );
}

export default memo(DataItemCard);
