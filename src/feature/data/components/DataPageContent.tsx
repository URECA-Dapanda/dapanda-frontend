"use client";

import { useQuery } from "@tanstack/react-query";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import CardHeaderComponent from "@components/common/card/CardHeaderComponent";
import MapItemCard from "@feature/map/components/sections/product/MapItemCard";
import { getMapList } from "@feature/map/api/mapRequest";
import SelectTypeCard from "@feature/map/components/sections/regist/SelectTypeCard";
import { getChatContentInfo } from "@feature/chat/api/chatRequest";
import ContentInfoCard from "@feature/chat/components/sections/ContentInfoCard";
import CurrentCashCard from "@feature/mypage/components/sections/CurrentCashCard";
import FilterCard from "./sections/filter/FilterCard";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";

export default function DataPageContent() {
  const { data: mapList } = useQuery({
    queryKey: ["map"],
    queryFn: getMapList,
  });
  const { data: chatInfoData } = useQuery({
    queryKey: ["chat/info"],
    queryFn: getChatContentInfo,
  });
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-112px)] sticky top-56 left-0 space-y-10 p-16">
      <FilterCard />
      <CurrentCashCard isInterection={true} />
      <CurrentCashCard />
      <SelectTypeCard />
      {chatInfoData && <ContentInfoCard data={chatInfoData} />}
      {/*      {dataList && dataList.map((item) => <DataItemCard data={item} key={item.id} />)}*/}

      {mapList && mapList.map((item) => <MapItemCard data={item} key={item.id} />)}

      <CardComponent variant="material" size={"lg"}>
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"lg"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <div className="grid grid-cols-2 gap-1 w-full">
        <CardComponent
          variant="flat"
          size="md"
          color="bg-gradient-to-r from-color-primary-300 to-color-secondary-300"
        >
          <CardHeaderComponent title="Test Card"></CardHeaderComponent>
          <CardContentComponent>
            <button>Button</button>
          </CardContentComponent>
        </CardComponent>
        <CardComponent variant="outlined" size={"sm"} color="border-color-primary-300">
          <CardContentComponent size={"md"}>
            <button>Button</button>
          </CardContentComponent>
        </CardComponent>
      </div>

      <CardComponent variant="material" size={"sm"} color="bg-color-primary-300">
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"sm"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <CardComponent variant="material" size={"sm"}>
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"md"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <VirtualizedInfiniteList />
    </div>
  );
}
