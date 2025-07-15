import { ReactNode } from "react";

interface Props {
  icon?: React.ElementType;
  label?: string;
}

export function DropdownItemContent({ icon: Icon, label }: Props): ReactNode {
  return (
    <span className="flex items-center gap-8 body-sm text-black">
      {Icon && <Icon className="w-16 h-16 ml-2 shrink-0 stroke-2 text-black" />}
      {label}
    </span>
  );
}
