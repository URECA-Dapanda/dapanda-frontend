"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  variant?: "default" | "outline";
}

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        variant === "default" &&
          "bg-secondary text-gray-600 inline-flex h-9 w-fit items-center justify-center rounded-12 p-3",
        variant === "outline" && "bg-white px-24 py-16 flex",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  variant?: "default" | "outline";
}

function TabsTrigger({ className, variant = "default", children, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "transition-colors disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && [
          "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent",
          "px-2 py-1 text-sm font-medium whitespace-nowrap",
          "text-gray-600 data-[state=active]:text-black data-[state=active]:shadow-sm",
        ],
        variant === "outline" && [
          "shadow-none",
          "flex-1 pb-12 text-center h3 relative text-gray-400",
          "data-[state=active]:text-primary data-[state=active]:font-bold",
          "data-[state=active]:shadow-none",
        ],
        className
      )}
      {...props}
    >
      {children}
      {variant === "outline" && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary data-[state=inactive]:hidden" />
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
