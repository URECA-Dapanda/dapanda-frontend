"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface PurchaseModeTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const TABS = [
  { label: "일반 구매", value: "normal", content: "일반 구매 내용입니다." },
  { label: "자투리 구매", value: "fragment", content: "자투리 구매 내용입니다." },
];

function useMultiRef<T>() {
  const refs = useRef<(T | null)[]>([]);
  const getRef = useCallback(
    (i: number) => (el: T | null) => {
      refs.current[i] = el;
    },
    []
  );
  return [refs, getRef] as const;
}

export default function PurchaseModeTabs({ value, onChange }: PurchaseModeTabsProps) {
  const [triggerRefs, setTriggerRef] = useMultiRef<HTMLButtonElement>();
  const [pendingValue, setPendingValue] = useState(value);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const index = TABS.findIndex((tab) => tab.value === pendingValue);
    const current = triggerRefs.current[index];
    if (current) {
      const { offsetLeft, offsetWidth } = current;
      setHighlightStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [pendingValue, triggerRefs]);

  const handleTabChange = (next: string) => {
    setPendingValue(next);
    setTimeout(() => {
      onChange(next);
    }, 150);
  };

  return (
    <Tabs value={value} onValueChange={handleTabChange}>
      <TabsList className="relative w-[327px] h-[44px] bg-color-bg-secondary rounded-full p-1 mb-6 flex">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.4 }}
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          className="absolute top-1 bottom-1 rounded-full bg-color-bg-secondary2 z-0"
        />
        {TABS.map((tab, i) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={setTriggerRef(i)}
            className={cn(
              "relative z-10 flex-1 py-3 px-6 rounded-full text-sm font-bold transition-colors",
              "text-color-gray-600 data-[state=active]:text-color-text-black",
              "data-[state=active]:bg-color-bg-secondary2"
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="w-full text-color-text-black body-sm"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
