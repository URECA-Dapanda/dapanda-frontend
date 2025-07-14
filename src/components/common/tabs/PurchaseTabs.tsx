"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PURCHASE_MODE_TABS } from "@/components/common/tabs/tabsConfig";
import { useSlidingHighlight } from "@/components/common/tabs/useSlidingHighlight";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PurchaseModeTabs({ value, onChange }: Props) {
  const { setTriggerRef, highlightStyle } = useSlidingHighlight(PURCHASE_MODE_TABS, value);

  const handleTabChange = (next: string) => {
    setTimeout(() => {
      onChange(next);
    }, 150);
  };

  return (
    <Tabs value={value} onValueChange={handleTabChange}>
      <TabsList className="relative w-[327px] h-44 bg-secondary rounded-full mb-24 flex items-center p-1">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.4 }}
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          className="absolute inset-y-1 rounded-full bg-secondary2 z-0"
        />
        {PURCHASE_MODE_TABS.map((tab, i) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={setTriggerRef(i)}
            className={cn(
              "relative z-10 flex-1 h-full rounded-full text-center body-sm font-medium transition-colors",
              "text-gray-600 data-[state=active]:text-black data-[state=active]:bg-secondary2"
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {PURCHASE_MODE_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-full text-black body-sm">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
