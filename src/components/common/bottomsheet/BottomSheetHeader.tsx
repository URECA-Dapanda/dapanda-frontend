import { ReactNode } from "react";

interface BottomSheetHeaderProps {
  title?: string;
}

export default function BottomSheetHeader({ title }: BottomSheetHeaderProps) {
  return (
    <div className="pt-4 pb-2 px-6 sticky top-0 bg-white z-10">
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>
    </div>
  );
}
