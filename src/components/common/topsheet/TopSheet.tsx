"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FullScreenModal from "@/components/common/modal/FullScreenModal";
import { BadgeComponent } from "@/components/common/badge";
import { Siren } from "lucide-react";

interface TopSheetProps {
  type: "post" | "wifi";
  data: any;
}

export default function TopSheet({ type, data }: TopSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sheetHeight = expanded ? 478 : 311;

  const getImageStyle = (expanded: boolean, type: "post" | "wifi") => {
    if (expanded) {
      return {
        top: 30,
        left: "50%",
        x: "-50%",
        width: 240,
        height: 240,
        rotate: 0,
      };
    }

    if (type === "post") {
      return {
        top: 24,
        right: -40,
        width: 240,
        height: 240,
        rotate: 19.66,
        x: 0,
      };
    }

    return {
      top: 24,
      left: "50%",
      x: "-50%",
      width: 140,
      height: 140,
      rotate: 0,
    };
  };

  return (
    <motion.div
      className="absolute top-0 w-[375px] bg-secondary shadow-default rounded-b-30 overflow-hidden"
      style={{ height: sheetHeight }}
      animate={{ y: expanded ? -11 : 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 100 }}
      onDragEnd={(event, info) => {
        if (info.offset.y > 60 || info.velocity.y > 500) {
          setExpanded(true);
        } else {
          setExpanded(false);
        }
      }}
    >
      <motion.img
        src={data.imageUrl}
        alt="대표 이미지"
        onClick={() => setIsModalOpen(true)}
        className="cursor-zoom-in absolute"
        animate={getImageStyle(expanded, type)}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      />

      <motion.div
        className="relative z-10 pl-[30px] px-4 space-y-1"
        animate={{ paddingTop: expanded ? 270 : 73 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        {type === "post" && data.hasReported && (
          <>
            <motion.div
              className="absolute top-4 right-4 z-20 rounded-full bg-white shadow-default w-30 h-30 flex items-center justify-center"
              animate={{ y: expanded ? 20 : 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <Siren className="text-red-500 w-12 h-12" />
            </motion.div>
            <div className="space-y-[8px]">
              <BadgeComponent variant="meta" size="md" className="bg-gray-400">
                {data.uploadTime} 전
              </BadgeComponent>
              <h2 className="h1">{data.title}</h2>
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="title-md">{data.price}원</p>
              <p className="body-xs">{data.unitPrice}원/100MB</p>

              {data.recentPrice && data.averagePrice && (
                <div className="flex gap-[12px] pt-[23px] flex-wrap">
                  <BadgeComponent variant="meta" size="md" className="bg-white">
                    최근거래가: {data.recentPrice}원
                  </BadgeComponent>
                  <BadgeComponent variant="meta" size="md" className="bg-white">
                    평균거래가: {data.averagePrice}원
                  </BadgeComponent>
                </div>
              )}
            </div>
          </>
        )}
        {type === "wifi" && (
          <>
            <span className="badge bg-secondary2">와이파이</span>
            <h2 className="title-md">{data.place}</h2>
            <p className="caption-md text-gray-500">{data.address}</p>
            <p className="caption-md">
              {data.openTime} - {data.closeTime}
            </p>
            <p className="caption-md">{data.pricePer10min}원/10분</p>
            <p className="caption-md text-gray-600">{data.description}</p>
          </>
        )}
      </motion.div>

      {isModalOpen && (
        <FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={data.imageUrl} alt="확대 이미지" className="w-full h-auto rounded-12" />
        </FullScreenModal>
      )}
    </motion.div>
  );
}
