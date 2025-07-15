interface BottomSheetHeaderProps {
  title?: string;
}

export default function BottomSheetHeader({ title }: BottomSheetHeaderProps) {
  return (
    <div className="bg-white z-10">
      <div className="w-50 h-1.5 bg-gray-300 rounded-full mx-auto mt-24 mb-16" />
      <div className="flex items-center justify-between">
        <h2 className="h3 text-black">{title}</h2>
      </div>
    </div>
  );
}
