"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSlidingHighlight } from "@/components/common/tabs/useSlidingHighlight";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface SlidingTabsProps {
  tabs: readonly TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: "pill" | "outline";
  delay?: number;
  contentClassName?: string;
}

export default function SlidingTabs({
  tabs,
  value,
  onChange,
  variant = "outline",
  delay = 0,
  contentClassName = "",
}: SlidingTabsProps) {
  const { setTriggerRef, highlightStyle } = useSlidingHighlight(tabs, value);

  const handleChange = (next: string) => {
    if (delay > 0) {
      setTimeout(() => onChange(next), delay);
    } else {
      onChange(next);
    }
  };

  const styles = {
    pill: {
      tabList: "w-[327px] h-44 bg-secondary rounded-full mb-24 flex items-center p-1",
      highlight: "inset-y-1 rounded-full bg-secondary2 z-0",
      trigger: cn(
        "relative z-10 flex-1 h-full rounded-full text-center body-sm font-medium transition-colors",
        "text-gray-600 data-[state=active]:text-black data-[state=active]:bg-secondary2"
      ),
    },
    outline: {
      tabList: "bg-white flex gap-8 px-24 py-16",
      highlight: "bottom-0 h-[2px] bg-primary",
      trigger: cn(
        "!shadow-none w-[140px] h-[30px] title-sm text-gray-400 text-center relative",
        "bg-white shadow-none border-none",
        "data-[state=active]:text-primary data-[state=active]:font-bold"
      ),
    },
  }[variant];

  return (
    <Tabs value={value} onValueChange={handleChange}>
      <TabsList className={cn("relative", styles.tabList)}>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.4 }}
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          className={cn("absolute", styles.highlight)}
        />
        {tabs.map((tab, i) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={setTriggerRef(i)}
            className={styles.trigger}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className={contentClassName}>
          {tab.content}
        </TabsContent>
      ))} */}
    </Tabs>
  );
}
