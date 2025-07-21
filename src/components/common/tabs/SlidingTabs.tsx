"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Children, PropsWithChildren } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSlidingHighlight } from "@/components/common/tabs/useSlidingHighlight";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  value: string;
  content?: React.ReactNode;
}

interface SlidingTabsProps {
  tabs: readonly TabItem[];
  value: string;
  defaultValue?: string;
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
  defaultValue,
  children,
}: //contentClassName = "",
PropsWithChildren<SlidingTabsProps>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param: string | null = searchParams.get("tab");
  const currentTab: string = param !== null ? param : value;
  const { setTriggerRef, highlightStyle } = useSlidingHighlight(tabs, currentTab);

  const handleChange = (next: string) => {
    if (delay > 0) {
      setTimeout(() => onChange(next), delay);
    } else {
      onChange(next);
    }
    const params = new URLSearchParams(searchParams);
    params.set("tab", next);
    router.push(`?${params.toString()}`);
  };

  const styles = {
    pill: {
      tabList: "w-[327px] h-44 bg-secondary rounded-full mb-12 flex items-center p-1",
      highlight: "inset-y-1 rounded-full bg-secondary2 z-0",
      trigger: cn(
        "relative z-10 flex-1 h-full rounded-full text-center body-sm font-medium transition-colors  hover:cursor-pointer",
        "text-gray-600 data-[state=active]:text-black data-[state=active]:bg-secondary2"
      ),
    },
    outline: {
      tabList: "bg-white flex gap-8 py-16",
      highlight: "bottom-0 h-[2px] bg-primary",
      trigger: cn(
        "!shadow-none w-[140px] h-[30px] title-sm text-gray-400 text-center relative  hover:cursor-pointer",
        "bg-white shadow-none border-none",
        "data-[state=active]:text-primary data-[state=active]:font-bold"
      ),
    },
  }[variant];

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleChange}
      defaultValue={defaultValue}
      className="overflow-x-visible whitespace-nowrap transition-all "
    >
      <TabsList className={cn("relative mx-auto", styles.tabList)}>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.4 }}
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          className={cn("absolute hover:cursor-pointer", styles.highlight)}
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
      {Children.map(
        children,
        (child, i) => tabs[i] && <TabsContent value={tabs[i].value}>{child}</TabsContent>
      )}
    </Tabs>
  );
}
