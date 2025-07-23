"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import FullScreenModal from "@/components/common/modal/FullScreenModal";
import type { TopSheetProps } from "@/components/common/topsheet/topSheet.types";
import { PostTopSheetContent } from "./PostTopSheetContent";
import { WifiTopSheetContent } from "./WifiTopSheetContent";
import { useTopSheetExpanded } from "./useTopSheetExpanded";
import { useTopSheetImageStyle } from "./useTopSheetImageStyle";
import ReportTriggerButton from "../button/ReportTriggerButton";

export default function TopSheet({
  type,
  data,
  onImageClick,
  onExpandChange,
}: TopSheetProps & {
  onExpandChange?: (expanded: boolean) => void;
}) {
  const { expanded, setExpanded, handleDragEnd } = useTopSheetExpanded();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrls: string[] = Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl];
  const imageStyle = useTopSheetImageStyle(expanded, type);

  const handleToggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);

  useEffect(() => {
    onExpandChange?.(expanded);
  }, [expanded, onExpandChange]);

  return (
    <>
      <div className="absolute top-12 right-12 z-30">
        <ReportTriggerButton />
      </div>
      <motion.div
        className=" absolute top-0 w-[375px] bg-secondary shadow-default rounded-b-30 overflow-hidden"
        animate={{ y: expanded ? -10 : 0 }}
        dragConstraints={{ top: 0, bottom: 0 }}
      >
        <motion.div
          className="w-full h-full pt-20"
          drag="y"
          transition={{ type: "decay", damping: 20, stiffness: 200 }}
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(event, info) => handleDragEnd(info)}
          onClick={handleToggleExpand}
        >
          {type === "post" && (
            <motion.img
              src={data.imageUrl}
              alt="대표 이미지"
              onClick={undefined}
              className={`top-56 absolute rounded-12 z-30`}
              style={{ pointerEvents: "none" }}
              animate={imageStyle}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            />
          )}
          {type === "wifi" && (
            <>
              {expanded ? (
                <div className="pt-6 pb-2 flex justify-center">
                  {imageUrls.length > 1 ? (
                    <Carousel
                      className="w-full max-w-[280px]"
                      opts={{
                        watchDrag: false,
                      }}
                    >
                      <CarouselContent>
                        {imageUrls.map((url, idx) => (
                          <CarouselItem key={idx} className="basis-[100%]">
                            <Image
                              src={url}
                              alt={`와이파이 이미지 ${idx + 1}`}
                              onClick={onImageClick}
                              className="w-[200px] h-[200px] object-cover rounded-12 mx-auto cursor-zoom-in"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : (
                    <Image
                      src={imageUrls[0]}
                      alt="와이파이 이미지"
                      onClick={onImageClick}
                      className="w-[200px] h-[200px] object-cover rounded-12 mx-auto cursor-zoom-in"
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={imageUrls[0]}
                  alt="와이파이 대표 이미지"
                  className="cursor-zoom-in absolute rounded-12 z-30"
                  style={{
                    top: 44,
                    right: 30,
                    width: 140,
                    height: 140,
                    position: "absolute",
                    objectFit: "cover",
                  }}
                  onClick={onImageClick}
                />
              )}
            </>
          )}
          <motion.div
            className="relative z-10 pl-30 px-4 space-y-1"
            animate={{
              paddingTop: type === "wifi" ? 20 : expanded ? 200 : 60,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            {type === "post" && <PostTopSheetContent data={data} expanded={expanded} />}
            {type === "wifi" && <WifiTopSheetContent data={data} expanded={expanded} />}
          </motion.div>
        </motion.div>

        {!expanded ? (
          <div onClick={() => setExpanded(true)} className="flex justify-center pt-16 pb-8">
            <div className="w-[30%] h-1.5 bg-gray-400/60 rounded-full" />
          </div>
        ) : (
          <div
            onClick={() => setExpanded(false)}
            className="flex justify-center pt-12 pb-8 cursor-pointer"
          >
            <div className="w-[30%] h-1.5 bg-gray-400/60 rounded-full" />
          </div>
        )}
        {isModalOpen && (
          <FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Image
              src={Array.isArray(data.imageUrl) ? data.imageUrl[0] : data.imageUrl}
              alt="확대 이미지"
              className="w-auto h-auto max-w-screen max-h-screen object-contain"
            />
          </FullScreenModal>
        )}
      </motion.div>
    </>
  );
}
