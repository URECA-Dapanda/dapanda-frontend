// "use client";

// import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
// import MapItemCard from "@feature/map/components/sections/product/MapItemCard";
// import { getMapList } from "@feature/map/api/mapRequest";
// import SelectTypeCard from "@feature/map/components/sections/regist/SelectTypeCard";
// import { getChatContentInfo } from "@feature/chat/api/chatRequest";
// import ContentInfoCard from "@feature/chat/components/sections/ContentInfoCard";
// import CurrentCashCard from "@feature/mypage/components/sections/CurrentCashCard";
// import FilterCard from "./sections/filter/FilterCard";
// import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
// import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
// import { getDataList } from "../api/dataRequest";
// import DataItemCard from "./sections/product/DataItemCard";
// import { DataType } from "../types/dataType";
// import { MapType } from "@feature/map/types/mapType";
// import CollapseVirtualizedList from "@components/common/list/CollapseVirtualizedList";
// import { useState } from "react";

// export default function DataPageContent() {
//   const [sheetOpen, setSheetOpen] = useState(true);
//   const [tab, setTabl] = useState("normal");

//   const {
//     parentRef: parentRefForData,
//     rowVirtualizer: rowVirtualizerForData,
//     flatItems: flatItemsForData,
//     isFetchingNextPage: isFetchingNextPageForData,
//     hasNextPage: hasNextPageForData,
//     fetchNextPage: fetchNextPageForData,
//   } = useVirtualizedInfiniteQuery<DataType>({
//     queryKey: ["dataItems"],
//     queryFn: ({ pageParam = 0 }: QueryFunctionContext) => getDataList({ pageParam }),
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     estimateSize: () => 200,
//     mode: "scroll",
//   });

//   const {
//     parentRef: parentRefForMap,
//     rowVirtualizer: rowVirtualizerForMap,
//     flatItems: flatItemsForMap,
//     isFetchingNextPage: isFetchingNextPageForMap,
//     hasNextPage: hasNextPageForMap,
//     fetchNextPage: fetchNextPageForMap,
//   } = useVirtualizedInfiniteQuery<MapType>({
//     queryKey: ["mapItems"],
//     queryFn: ({ pageParam = 0 }: QueryFunctionContext) => getMapList({ pageParam }),
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     estimateSize: () => 200,
//     mode: "button",
//   });

//   const { data: chatInfoData } = useQuery({
//     queryKey: ["chat/info"],
//     queryFn: getChatContentInfo,
//   });
//   return (
//     <div className="overflow-y-auto max-h-[calc(100vh-112px)] sticky top-56 left-0 space-y-10 p-16">
//       <FilterCard />
//       <CurrentCashCard isInterection={true} />
//       <CurrentCashCard />
//       <SelectTypeCard />
//       {chatInfoData && <ContentInfoCard data={chatInfoData} />}

//       <CollapseVirtualizedList
//         parentRef={parentRefForData}
//         rowVirtualizer={rowVirtualizerForData}
//         items={flatItemsForData}
//         isFetchingNextPage={isFetchingNextPageForData}
//         hasNextPage={hasNextPageForData}
//         fetchNextPage={fetchNextPageForData}
//         renderItem={(item: DataType) => <DataItemCard data={item} />}
//       />

//       <VirtualizedInfiniteList
//         mode="scroll"
//         parentRef={parentRefForData}
//         rowVirtualizer={rowVirtualizerForData}
//         items={flatItemsForData}
//         isFetchingNextPage={isFetchingNextPageForData}
//         hasNextPage={hasNextPageForData}
//         fetchNextPage={fetchNextPageForData}
//         renderItem={(item: DataType) => <DataItemCard data={item} />}
//       />

//       <VirtualizedInfiniteList
//         mode="button"
//         parentRef={parentRefForMap}
//         rowVirtualizer={rowVirtualizerForMap}
//         items={flatItemsForMap}
//         isFetchingNextPage={isFetchingNextPageForMap}
//         hasNextPage={hasNextPageForMap}
//         fetchNextPage={fetchNextPageForMap}
//         renderItem={(item: MapType) => <MapItemCard data={item} />}
//       />
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import FilterCard from "./sections/filter/FilterCard";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import { PurchaseModeTabs } from "@/components/common/tabs";

import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getDataList } from "../api/dataRequest";
import { DataType } from "../types/dataType";
import DataItemCard from "./sections/product/DataItemCard";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";

export default function DataPageContent() {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [tab, setTab] = useState("normal");

  const {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useVirtualizedInfiniteQuery<DataType>({
    queryKey: ["dataItems", tab],
    queryFn: ({ pageParam = 0 }) => getDataList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 160,
    mode: "scroll",
  });

  return (
    <div className="relative h-[100dvh] w-full bg-primary2">
      {/* 상단 필터 영역 */}
      <div className="sticky top-0 z-10 bg-primary2 p-4">
        <FilterCard />
      </div>

      {/* 바텀시트 */}
      <BaseBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        variant="snap"
        snapHeight={250}
      >
        <div className="space-y-4">
          {/* 탭 */}
          <div className="flex justify-center mt-24">
            <PurchaseModeTabs value={tab} onChange={setTab} /> 
          </div>

          {/* 리스트 */}
          <VirtualizedInfiniteList
            mode="scroll"
            parentRef={parentRef}
            rowVirtualizer={rowVirtualizer}
            items={flatItems}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            renderItem={(item: DataType) => <DataItemCard data={item} />}
          />
        </div>
      </BaseBottomSheet>
    </div>
  );
}
