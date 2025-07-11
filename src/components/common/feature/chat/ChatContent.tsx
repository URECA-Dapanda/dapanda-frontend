"use client";

import { CheckCircleIcon } from "lucide-react";
import { Siren } from "lucide-react";
import { Badge } from "@components/common/Badge";

export default function ChatContent() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-lg">뱃지 테스트</h2>
      <div className="mt-10">
        <Badge>Default</Badge>
        <Badge variant="wifi">wifi</Badge>
        <Badge variant="hotspot">hotspot</Badge>
        <Badge variant="dot">1</Badge>
        <Badge variant="compact">11개</Badge>
        <Badge variant="modalIcon">
          <CheckCircleIcon className="w-6 h-6" />
        </Badge>
        <Badge variant="compactWide">자투리구매</Badge>
        <Badge variant="report">
          <Siren className="w-4 h-4" />
        </Badge>
      </div>
      <h2 className="font-bold text-lg mt-20">버튼 테스트</h2>
    </div>
  );
}
