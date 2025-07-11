"use client";

import { BadgeComponent } from "@components/common/badge";

export default function ChatContent() {
  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="font-bold text-lg">뱃지 테스트</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <BadgeComponent variant="count" size="md">
            22
          </BadgeComponent>

          <BadgeComponent variant="label" size="sm">
            자투리구매
          </BadgeComponent>

          <BadgeComponent variant="mapcategory" className="bg-color-bg-primary2 text-black">
            와이파이
          </BadgeComponent>
          <BadgeComponent variant="mapcategory" className="bg-color-bg-secondary2 text-white">
            핫스팟
          </BadgeComponent>
        </div>
      </section>
      <section className="mt-10">
        <p>채팅 내용이 여기에 들어갑니다...</p>
      </section>
    </div>
  );
}
