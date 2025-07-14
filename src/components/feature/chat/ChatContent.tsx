"use client";

import { BadgeComponent } from "@components/common/badge";

export default function ChatContent() {
  return (
    <div className="p-4 space-y-4">
      <section>
        <h2 className="font-bold text-lg">뱃지 테스트</h2>
        <div className="mt-4 flex flex-col items-start gap-2">
          <BadgeComponent variant="count" size="md">
            22
          </BadgeComponent>
          <BadgeComponent variant="label" size="sm">
            자투리 구매매매
          </BadgeComponent>
          <BadgeComponent variant="mapcategory" size="lg" className="bg-primary2">
            와이파이
          </BadgeComponent>
          <BadgeComponent variant="mapcategory" size="lg" className="bg-secondary2">
            핫스팟
          </BadgeComponent>
          <BadgeComponent variant="outlined" size="sm">
            최근거래가가가가가가가가가가가가가가가가가가가가가가가가
          </BadgeComponent>
        </div>
      </section>
    </div>
  );
}
