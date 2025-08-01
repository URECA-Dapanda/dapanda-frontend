"use client";

import { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Trash2 } from "lucide-react";
import { formatRelativeTime } from "@lib/time";

interface NotificationCardProps {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  onDelete: (id: number) => void;
}

export default function NotificationCard({
  id,
  title,
  body,
  createdAt,
  onDelete,
}: NotificationCardProps) {
  const x = useMotionValue(0);
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#card-${id}`)) {
        animate(x, 0);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [id]);
  return (
    <div className="relative overflow-hidden rounded-20">
      <div className="absolute inset-0 flex justify-end items-center pr-20 bg-white z-0">
        <button
          className="text-red-600 font-bold flex items-center gap-2"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -60, right: 0 }}
        className="relative z-10 bg-white border border-primary-100 p-16 shadow-default rounded-20 cursor-pointer"
      >
        <div className="body-md text-primary-700">{title}</div>
        <div className="body-sm">{body}</div>
        <div className="body-xs text-gray-500">{formatRelativeTime(createdAt)}</div>
      </motion.div>
    </div>
  );
}