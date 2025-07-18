import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DataType } from "@feature/data/types/dataType";
import DataItemCard from "./DataItemCard";

interface CollapsibleDataListProps {
  items: DataType[];
}

export default function CollapsibleDataList({ items }: CollapsibleDataListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full space-y-16">
      <div className="relative min-h-[280px]">
        {!isExpanded ? (
          <div className="relative h-[280px]">
            {items.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="absolute left-0 right-0"
                style={{
                  top: index * 12,
                  zIndex: 10 - index,
                  transform: `translateY(${index * 10}px)`,
                }}
              >
                <DataItemCard data={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {items.map((item) => (
              <DataItemCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>

      {items.length > 3 && (
        <div className="flex justify-center">
          <button
            onClick={handleToggle}
            className="flex items-center text-blue-600 text-sm underline"
          >
            {isExpanded ? "접기" : "조합 펼쳐보기"}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
