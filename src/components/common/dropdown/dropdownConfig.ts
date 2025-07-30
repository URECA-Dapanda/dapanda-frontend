import {
  ArrowDown,
  Clock,
  User,
  AlertTriangle,
  MapPin,
  Star,
  HardDriveDownload,
  HardDriveUpload,
} from "lucide-react";
import { DropdownOption } from "@/components/common/dropdown/dropdown.types";

export const dataSortOptions = (onSelect: (label: string) => void): DropdownOption[] => [
  {
    label: "최신순",
    icon: Clock,
    action: { type: "action", onClick: () => onSelect("최신순") },
  },
  {
    label: "가격 낮은순",
    icon: ArrowDown,
    action: { type: "action", onClick: () => onSelect("가격 낮은순") },
  },
  {
    label: "데이터 적은순",
    icon: HardDriveDownload,
    action: { type: "action", onClick: () => onSelect("데이터 적은순") },
  },
  {
    label: "데이터 많은순",
    icon: HardDriveUpload,
    action: { type: "action", onClick: () => onSelect("데이터 많은순") },
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
    action: {
      type: "link",
      href: senderId ? `/data/review?id=${senderId}&tab=review` : "/data/review",
    },
  },
  {
    label: "신고하기",
    icon: AlertTriangle,
    action: { type: "action", onClick: onReport },
  },
];
