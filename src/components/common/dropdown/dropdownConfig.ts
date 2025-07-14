import { ArrowDown, ArrowUp, Clock, User, AlertTriangle } from "lucide-react";
import { DropdownMenuOption } from "@/components/common/dropdown/UserDropdownMenu";

export const dataSortOptions: DropdownMenuOption[] = [
  {
    label: "최신순",
    icon: Clock,
    action: { type: "action", onClick: () => console.log("최신순") },
  },
  {
    label: "가격 낮은순",
    icon: ArrowDown,
    action: { type: "action", onClick: () => console.log("가격 낮은순") },
  },
  {
    label: "가격 높은순",
    icon: ArrowUp,
    action: { type: "action", onClick: () => console.log("가격 높은순") },
  },
];

export const chatMenuOptions = (onReport: () => void): DropdownMenuOption[] => [
  {
    label: "프로필 보기",
    icon: User,
    action: { type: "link", href: "/user/profile" },
  },
  {
    label: "신고하기",
    icon: AlertTriangle,
    action: { type: "action", onClick: onReport },
  },
];
