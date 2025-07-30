"use client";

import { motion, useMotionValue } from "framer-motion";
import { Trash2 } from "lucide-react";

interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function NotificationCard({
  id,
  title,
  message,
  createdAt,
  onDelete,
}: NotificationCardProps) {
  const x = useMotionValue(0);

  return (
    <div className="relative overflow-hidden rounded-20">
      <div className="absolute inset-0 flex justify-end items-center pr-20 bg-white z-0">
        <button
          className="text-red-600 font-bold flex items-center gap-2"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -60, right: 0 }}
        style={{ x }}
        className="relative z-10 bg-white border border-primary-100 p-16 shadow-default rounded-20 cursor-pointer"
      >
        <div className="body-md text-primary-700">{title}</div>
        <div className="body-sm">{message}</div>
        <div className="body-xs text-gray-400">{createdAt}</div>
      </motion.div>
    </div>
  );
}