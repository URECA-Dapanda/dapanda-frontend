"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SALES_HISTORY_TABS } from "@/components/common/tabs/tabsConfig";
import { useSlidingHighlight } from "@/components/common/tabs/useSlidingHighlight";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function SalesHistoryTabs() {
  const [tab, setTab] = useState("selling");
  const { setTriggerRef, highlightStyle } = useSlidingHighlight(SALES_HISTORY_TABS, tab);

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="relative bg-white flex gap-8 px-24 py-16">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.4 }}
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          className="absolute bottom-0 h-[2px] bg-primary"
        />
        {SALES_HISTORY_TABS.map((tabItem, i) => (
          <TabsTrigger
            key={tabItem.value}
            value={tabItem.value}
            ref={setTriggerRef(i)}
            className={cn(
              "!shadow-none",
              "w-[140px] h-[30px] title-sm text-gray-400 text-center relative",
              "bg-white shadow-none border-none",
              "data-[state=active]:text-primary data-[state=active]:font-bold"
            )}
          >
            {tabItem.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {SALES_HISTORY_TABS.map((tabItem) => (
        <TabsContent key={tabItem.value} value={tabItem.value}>
          <div className="py-24">{tabItem.content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
