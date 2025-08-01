"use client";

import { motion } from "framer-motion";
import { ButtonComponent } from "@components/common/button";

interface Props {
  selected: {
    roadAddress: string;
    jibunAddress?: string;
    postalCode?: string;
  };
  onNext: () => void;
}

export default function MapSelectedInfoCard({ selected, onNext }: Props) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        duration: 0.4,
      }}
      className="fixed bottom-0 pb-safe-bottom w-full lg:w-[600px] mx-auto z-30 bg-white shadow-2xl border-t border-gray-200"
    >
      <div className="px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-24"
        >
          <div className="text-pink-500 font-semibold body-lg mb-12">{selected.roadAddress}</div>

          <div className="space-y-8">
            {selected.jibunAddress && (
              <div className="flex items-center gap-8 body-sm text-gray-600">
                <span className="bg-gray-100 px-8 py-4 rounded body-xs min-w-fit">지번</span>
                <span className="flex-1">{selected.jibunAddress}</span>
              </div>
            )}
            {selected.postalCode && (
              <div className="flex items-center gap-8 body-sm text-gray-600">
                <span className="bg-gray-100 px-8 py-4 rounded body-xs min-w-fit">우편번호</span>
                <span className="flex-1">{selected.postalCode}</span>
              </div>
            )}
          </div>
        </motion.div>

        <ButtonComponent
          variant="primary"
          size="xl"
          onClick={onNext}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold"
        >
          다음 단계로
        </ButtonComponent>
      </div>
    </motion.div>
  );
}
