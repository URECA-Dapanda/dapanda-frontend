import { ArrowDown, ArrowUp, Clock, User, AlertTriangle, MapPin, Star } from "lucide-react";
import { DropdownOption } from "@/components/common/dropdown/dropdown.types";

export const dataSortOptions: DropdownOption[] = [
  {
    label: "최신순",
    icon: Clock,
    action: { type: "action", onClick: () => console.log("최신순") },
  },
  {
    label: "가격 낮은순",
    icon: ArrowDown,
    action: { type: "action", onClick: () => console.log("낮은순") },
  },
  {
    label: "가격 높은순",
    icon: ArrowUp,
    action: { type: "action", onClick: () => console.log("높은순") },
  },
];

export const sortOptionMap: Record<string, "PRICE_ASC" | "AVERAGE_RATE_DESC" | "DISTANCE_ASC"> = {
  "가까운 순": "DISTANCE_ASC",
  "가격 낮은순": "PRICE_ASC",
  "평점 높은 순": "AVERAGE_RATE_DESC",
};

export const createDataSortOptions = (onSelect: (label: string) => void): DropdownOption[] => [
  {
    label: "가까운 순",
    icon: MapPin,
    action: { type: "action", onClick: () => onSelect("가까운 순") },
  },
  {
    label: "가격 낮은순",
    icon: ArrowDown,
    action: { type: "action", onClick: () => onSelect("가격 낮은순") },
  },
  {
    label: "평점 높은 순",
    icon: Star,
    action: { type: "action", onClick: () => onSelect("평점 높은 순") },
  },
];

export const chatMenuOptions = (onReport: () => void, senderId?: number): DropdownOption[] => [
  {
    label: "프로필 보기",
    icon: User,
    action: { type: "link", href: senderId ? `/map/review?memberId=${senderId}` : "/map/review" },
  },
  {
    label: "신고하기",
    icon: AlertTriangle,
    action: { type: "action", onClick: onReport },
  },
];
