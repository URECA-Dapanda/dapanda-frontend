import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@ui/card";
import { Label } from "@ui/label";
import { Slider } from "@ui/slider";

function AdvancedFilters({ showFilters }: { showFilters: boolean }) {
  const [dataAmount, setDataAmount] = useState([1]);
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <Card className="border-[#ffe8c6] bg-[#fefaef]">
            <CardContent className="p-4 space-y-4">
              {/* Data Amount Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  용량 검색
                </Label>
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-[#119c72]">
                    {dataAmount[0] >= 1
                      ? `${dataAmount[0]}GB`
                      : `${dataAmount[0] * 1000}MB`}
                  </div>
                  <p className="text-xs text-gray-600">
                    원하는 용량을 선택하세요
                  </p>
                </div>
                <Slider
                  value={dataAmount}
                  onValueChange={setDataAmount}
                  max={2}
                  min={0.1}
                  step={0.1}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>100MB</span>
                  <span>2GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(AdvancedFilters);
