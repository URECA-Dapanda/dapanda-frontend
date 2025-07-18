import { ChevronDown, ChevronUp } from "lucide-react";
import { DataType } from "@feature/data/types/dataType";
import DataItemCard from "@feature/data/components/sections/product/DataItemCard";

interface CollapsibleDataListProps {
  items: DataType[];
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CollapsibleDataList({ items, isExpanded, onToggle }: CollapsibleDataListProps) {
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
                <DataItemCard data={item} type="scrap" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {items.map((item) => (
              <DataItemCard key={item.id} data={item} type="scrap" />
            ))}
          </div>
        )}
      </div>

      {items.length > 2 && (
        <div
          className={`flex justify-center ${
            isExpanded ? "mt-16" : "mt-[-150px]"
          } relative z-10 transition-all duration-300`}
        >
          <button
            onClick={onToggle}
            className="bg-white rounded-full shadow-md p-8 border border-gray-300"
            aria-label={isExpanded ? "조합 접기" : "조합 펼쳐보기"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      )}
    </div>
  );
}
