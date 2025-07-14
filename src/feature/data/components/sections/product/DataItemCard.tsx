"use client";

import { memo, useCallback } from "react";
import DataItemContent from "./DataItemContent";
import { DataType, ProductItemProps } from "@feature/data/types/dataType";
import { useRouter } from "next/navigation";
import ItemCard from "@components/common/card/ItemCard";

function DataItemCard({ data }: ProductItemProps<DataType>) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/data/${data.id}`);
  }, [data]);

  return (
    <ItemCard handleClick={handleClick}>
      <DataItemContent data={data} />
    </ItemCard>
  );
}

export default memo(DataItemCard);
