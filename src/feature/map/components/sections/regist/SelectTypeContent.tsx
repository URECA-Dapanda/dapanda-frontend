import { PropsWithChildren } from "react";

interface SelectTypeContentProps {
  title: string;
  description: string;
}

export default function SelectTypeContent({
  title,
  description,
  children,
}: PropsWithChildren<SelectTypeContentProps>) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
        {children}
      </div>
      <div className="flex flex-col justify-center">
        <span className="title-xs text-black">{title}</span>
        <span className="body-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
}
