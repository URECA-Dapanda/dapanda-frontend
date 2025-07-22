"use client";

import { memo, useCallback } from "react";
import DataItemContent from "@feature/data/components/pages/DataItemContent";
import { DataType, ProductItemProps } from "@feature/data/types/dataType";
import { useRouter } from "next/navigation";
import ItemCard from "@components/common/card/ItemCard";

interface DataItemCardProps extends ProductItemProps<DataType> {
  type: "default" | "scrap";
}

function DataItemCard({ data, type }: DataItemCardProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    console.log(type, data.id);
    router.push(`/data/${data.id}`);
  }, [data, type]);

  return (
    <ItemCard handleClick={handleClick} size="md">
      <DataItemContent data={data} />
    </ItemCard>
  );
}

export default memo(DataItemCard);
