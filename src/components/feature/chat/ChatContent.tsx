"use client";

import { BadgeComponent } from "@components/common/badge";

export default function ChatContent() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-lg">뱃지 테스트</h2>
      <div className="mt-10">
        <BadgeComponent variant="mapcategory" className="bg-color-bg-primary2">
          와이파이
        </BadgeComponent>
        <BadgeComponent variant="mapcategory" className="bg-color-bg-secondary2">
          핫스팟
        </BadgeComponent>

        <BadgeComponent variant="number">22개</BadgeComponent>
        <BadgeComponent variant="number">1</BadgeComponent>

        <BadgeComponent variant="badgeInCard">자투리구매</BadgeComponent>
      </div>
    </div>
  );
}
