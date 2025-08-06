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
import FullScreenModal from "@components/common/modal/FullScreenModal";
import type { TopSheetProps } from "@components/common/topsheet/topSheet.types";
import { PostTopSheetContent } from "./PostTopSheetContent";
import { WifiTopSheetContent } from "./WifiTopSheetContent";
import { useTopSheetExpanded } from "./useTopSheetExpanded";
import { useTopSheetImageStyle } from "./useTopSheetImageStyle";
import ReportTriggerButton from "../button/ReportTriggerButton";
import clsx from "clsx";

const MotionImage = motion(Image);

export default function TopSheet({
  type,
  data,
  onExpandChange,
}: TopSheetProps & {
  onExpandChange?: (expanded: boolean) => void;
}) {
  const { expanded, setExpanded, handleDragEnd } = useTopSheetExpanded();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);

  const imageUrls: string[] =
    Array.isArray(data.imageUrl) && data.imageUrl.length > 0
      ? data.imageUrl
      : ["/default-wifi-image.png"];

  const isDefaultImage = (url: string) => url === "/default-wifi-image.png";

  const imageStyle = useTopSheetImageStyle(expanded, type);

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const [pointerStartTime, setPointerStartTime] = useState<number | null>(null);
  const [pointerMoved, setPointerMoved] = useState(false);

  const handleToggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);

  useEffect(() => {
    onExpandChange?.(expanded);
  }, [expanded, onExpandChange]);

  return (
    <>
      {!data.isOwner && (
        <div className="absolute top-12 right-12 z-1">
          <ReportTriggerButton targetName={data.memberName} />
        </div>
      )}
      <motion.div
        className={clsx(
          "w-full lg:w-[600px] ",
          "bg-secondary shadow-default rounded-b-30 overflow-hidden"
        )}
        animate={{ y: expanded ? 0 : 0 }}
        initial={false}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <motion.div
          className="relative w-full h-full pt-20"
          drag="y"
          transition={{ type: "decay", damping: 20, stiffness: 200 }}
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(event, info) => handleDragEnd(info)}
          onPointerDown={(e) => {
            setPointerStartTime(e.timeStamp);
            setPointerMoved(false);
          }}
          onPointerMove={() => setPointerMoved(true)}
          onClick={(e) => {
            if (pointerStartTime && e.timeStamp - pointerStartTime < 200 && !pointerMoved) {
              handleToggleExpand();
            }
            setPointerStartTime(null);
            setPointerMoved(false);
          }}
        >
          {type === "post" && (
            <MotionImage
              src={data.imageUrl || "/default-wifi-image.png"}
              alt="대표 이미지"
              className="top-56 absolute rounded-12"
              style={{ pointerEvents: "none" }}
              animate={imageStyle}
              width={240}
              height={240}
              priority={true}
              placeholder="blur"
              blurDataURL={data.imageUrl || "/default-wifi-image.png"}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            />
          )}

          {type === "wifi" && (
            <>
              {expanded ? (
                <div className="pt-6 pb-2 flex justify-center">
                  {imageUrls.length > 1 ? (
                    <Carousel className="w-full max-w-[280px]" opts={{ watchDrag: true }}>
                      <CarouselContent>
                        {imageUrls.map((url, idx) => (
                          <CarouselItem key={idx} className="basis-[100%] items-center flex">
                            <Image
                              src={url}
                              alt={`와이파이 이미지 ${idx + 1}`}
                              width={200}
                              height={200}
                              onClick={
                                isDefaultImage(url) ? undefined : (e) => handleImageClick(idx, e)
                              }
                              className={`object-cover rounded-12 mx-auto ${
                                isDefaultImage(url) ? "" : "cursor-zoom-in"
                              }`}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious onClick={(e) => e.stopPropagation()} />
                      <CarouselNext onClick={(e) => e.stopPropagation()} />
                    </Carousel>
                  ) : (
                    <Image
                      src={imageUrls[0]}
                      alt="와이파이 이미지"
                      onClick={
                        isDefaultImage(imageUrls[0]) ? undefined : (e) => handleImageClick(0, e)
                      }
                      width={140}
                      height={140}
                      className={`object-cover rounded-12 mx-auto ${
                        isDefaultImage(imageUrls[0]) ? "" : "cursor-zoom-in"
                      }`}
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={imageUrls[0]}
                  alt="와이파이 대표 이미지"
                  className={`absolute top-1/2 -translate-y-[calc(50%-15px)] right-24 rounded-12 ${
                    isDefaultImage(imageUrls[0]) ? "" : "cursor-zoom-in"
                  }`}
                  width={140}
                  height={140}
                  onClick={isDefaultImage(imageUrls[0]) ? undefined : (e) => handleImageClick(0, e)}
                />
              )}
            </>
          )}

          <motion.div
            className="relative pl-30 px-4 space-y-1 mb-20"
            animate={{
              paddingTop: type === "wifi" ? 20 : expanded ? 200 : 90,
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

        {isModalOpen && modalImageIndex !== null && (
          <FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="relative w-[70dvw] lg:w-[420px] h-main-safe justify-center-safe items-start">
              <Image
                src={imageUrls[modalImageIndex]}
                alt={`확대 이미지 ${modalImageIndex + 1}`}
                fill
                className="object-contain "
              />
            </div>
          </FullScreenModal>
        )}
      </motion.div>
    </>
  );
}
