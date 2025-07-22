"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/default/ProfileCard";
import { getDataDetail } from "@/feature/data/api/dataRequest";
import { DataDetailResponse } from "@/feature/data/types/dataType";
import { formatRelativeTime } from "@lib/time";
import ItemCard from "@components/common/card/ItemCard";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";
import { useProfileStore } from "@stores/useProfileStore";
import { ChevronRight } from "lucide-react";
import { formatDataSize, formatPriceString } from "@lib/formatters";
import clsx from "clsx";

export default function DataDetailContent() {
  const params = useParams();
  const [data, setData] = useState<DataDetailResponse | null>(null);
  const postId = String(params.postId);
  const renderModals = UsePaymentModals();
  const { setInfo } = usePaymentStore();
  const currentUserId = useProfileStore((state) => state.id); // 로그인 유저 ID
  const isOwner = data && currentUserId === data.memberId;
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [topSheetExpanded, setTopSheetExpanded] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getDataDetail(postId);
      setData(res);
    };
    fetchDetail();
  }, [postId]);
  // useEffect(() => {
  //   const dummyData: DataDetailResponse = {
  //     productId: 1,
  //     itemId: 1,
  //     price: 3000,
  //     memberId: 123,
  //     memberName: "테스트판매자",
  //     remainAmount: 2.0,
  //     pricePer100MB: 300,
  //     averageRate: 4.7,
  //     reviewCount: 3,
  //     updatedAt: new Date().toISOString(),
  //     splitType: true, // 분할판매 ON
  //   };
  //   setData(dummyData);
  // }, []);

  if (!data) return <div className="text-center mt-20">로딩 중...</div>;

  const topSheetData = {
    imageUrl: `/${data.remainAmount}.png`,
    //imageUrl: `/${data.pricePer100MB}.png`,
    title: `${data.remainAmount}GB`,
    price: data.price,
    unitPrice: data.pricePer100MB,
    uploadTime: formatRelativeTime(data.updatedAt),
    recentPrice: 0,
    averagePrice: data.averageRate,
    hasReported: false,
    splitType: data.splitType,
  };

  const seller = {
    name: data.memberName,
    rating: data.averageRate,
    reviewCount: data.reviewCount,
  };

  // 결제에 사용될 info mock 데이터
  // const paymentInfo = {
  //   type: "data" as const,
  //   title: `${data.remainAmount}GB`,
  //   price: `${data.price.toLocaleString()}원`,
  //   unitPrice: `${data.pricePer100MB.toLocaleString()}원`,
  //   badge: "자투리 구매" as const,
  //   seller: data.memberName,
  //   cash: "12,500원", // 추후 API 연동 예정
  //   remainingData: "5.98GB",
  // };

  return (
    <div className="relative">
      <TopSheet
        type="post"
        data={topSheetData}
        onImageClick={() => {}}
        onExpandChange={setTopSheetExpanded}
      />
      <div
        className={clsx(
          "space-y-12 px-24 transition-all duration-300",
          topSheetExpanded ? "pt-[450px]" : "pt-[300px]"
        )}
      ></div>
      <div className="space-y-12 px-24 pb-28">
        {data.splitType && (
          <div className="bg-primary2 w-[327px] p-16 rounded-20">
            <FilterCardContent
              buttonText="구매하기"
              max={data.remainAmount}
              onValueChange={(v) => setSelectedAmount(v[0])}
              onButtonClick={() =>
                setInfo({
                  type: "data",
                  title: `${selectedAmount}GB`,
                  price: `${Math.floor(selectedAmount * data.pricePer100MB).toLocaleString()}원`,
                  unitPrice: `${data.pricePer100MB.toLocaleString()}원`,
                  badge: "자투리 구매",
                  seller: data.memberName,
                  cash: formatPriceString(12500), // TODO: API 연동
                  remainingData: formatDataSize(data.remainAmount - selectedAmount),
                })
              }
              value={[selectedAmount]}
            />
          </div>
        )}

        <div className="space-y-28">
          <div className="flex items-center justify-between">
            <div className="title-md">판매자</div>
            {isOwner && (
              <ButtonComponent variant={"outlineGray"} size="xs">
                글 수정하기
              </ButtonComponent>
            )}
          </div>
          <ProfileCard name={seller.name} rating={seller.rating} reviewCount={seller.reviewCount} />
          <div className="flex justify-center ">
            <ButtonComponent
              variant={"primary"}
              className="w-full px-60"
              onClick={() =>
                setInfo({
                  type: "data",
                  title: formatDataSize(data.remainAmount),
                  price: formatPriceString(data.price),
                  unitPrice: formatPriceString(data.pricePer100MB),
                  badge: "일반 구매",
                  seller: data.memberName,
                  cash: formatPriceString(12500),
                  remainingData: "5.98GB",
                })
              }
            >
              구매하기
            </ButtonComponent>
          </div>
        </div>
      </div>
      {renderModals}
    </div>
  );
}
