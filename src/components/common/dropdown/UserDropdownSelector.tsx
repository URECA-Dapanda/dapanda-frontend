"use client";

import {
  UserDropdownMenu,
  DropdownMenuOption,
} from "@/components/common/dropdown/UserDropdownMenu";

interface DropdownSelectorProps {
  options: DropdownMenuOption[];
  selectedLabel?: string;
  onSelectLabel?: (label: string) => void;
}

export function UserDropdownSelector({
  options,
  selectedLabel,
  onSelectLabel,
}: DropdownSelectorProps) {
  return (
    <UserDropdownMenu
      options={options.map((opt) => {
        if (opt.action.type === "action") {
          const originalOnClick = opt.action.onClick;
          return {
            ...opt,
            action: {
              type: "action",
              onClick: () => {
                originalOnClick?.();
                onSelectLabel?.(opt.label ?? "");
              },
            },
          };
        }
        return opt;
      })}
    >
      <button className="text-sm px-3 py-2 rounded-md bg-gray-100">
        {selectedLabel ?? "선택"}
      </button>
    </UserDropdownMenu>
  );
}
