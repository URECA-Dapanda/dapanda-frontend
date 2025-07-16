"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import FullScreenModal from "@/components/common/modal/FullScreenModal";
import type { TopSheetProps } from "@/components/common/topsheet/topSheet.types";
import { PostTopSheetContent } from "@/components/common/topsheet/PostTopSheetContent";
import { WifiTopSheetContent } from "@/components/common/topsheet/WifiTopSheetContent";

export default function TopSheet({ type, data, onImageClick }: TopSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrls: string[] = Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl];
  const getImageStyle = (expanded: boolean, type: "post" | "wifi") => {
    if (type === "post") {
      return expanded
        ? {
            top: 51,
            left: "50%",
            x: "-50%",
            width: 200,
            height: 200,
            rotate: 0,
          }
        : {
            top: 56,
            right: -37,
            width: 240,
            height: 240,
            rotate: 19.66,
            x: 0,
          };
    }
    return {};
  };

  return (
    <motion.div
      className=" absolute top-0 w-[375px] bg-secondary shadow-default rounded-b-30 overflow-hidden"
      animate={{ y: expanded ? -10 : 0 }}
      dragConstraints={{ top: 0, bottom: 0 }}
    >
      <motion.div
        className="w-full h-full pt-52"
        drag="y"
        transition={{ type: "decay", damping: 20, stiffness: 200 }}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 56 || info.velocity.y > 500) {
            setExpanded(true);
          } else {
            setExpanded(false);
          }
        }}
      >
        {type === "post" && (
          <motion.img
            src={data.imageUrl}
            alt="대표 이미지"
            onClick={onImageClick}
            className="cursor-zoom-in absolute rounded-12 z-30"
            animate={getImageStyle(expanded, type)}
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
                          <img
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
                  <img
                    src={imageUrls[0]}
                    alt="와이파이 이미지"
                    onClick={onImageClick}
                    className="w-[200px] h-[200px] object-cover rounded-12 mx-auto cursor-zoom-in"
                  />
                )}
              </div>
            ) : (
              <img
                src={imageUrls[0]}
                alt="와이파이 대표 이미지"
                className="cursor-zoom-in absolute rounded-12 z-30"
                style={{
                  top: 75,
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
            paddingTop: type === "wifi" ? (expanded ? 20 : 20) : expanded ? 200 : 60,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        >
          {type === "post" && (
            <>
              <PostTopSheetContent data={data} expanded={expanded} />
            </>
          )}
          {type === "wifi" && (
            <>
              <WifiTopSheetContent data={data} expanded={expanded} />
            </>
          )}
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
          <img
            src={Array.isArray(data.imageUrl) ? data.imageUrl[0] : data.imageUrl}
            alt="확대 이미지"
            className="w-auto h-auto max-w-screen max-h-screen object-contain"
          />
        </FullScreenModal>
      )}
    </motion.div>
  );
}
