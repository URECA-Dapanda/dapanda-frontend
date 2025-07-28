// app/map/regist/[type]/page.tsx
"use client";

import MapSelectLocationPage from "@/feature/map/components/pages/MapSelectLocation";
import { use } from "react";

export default function RegistLocationPage({
  params,
}: {
  params: Promise<{ type: "hotspot" | "wifi" }>;
}) {
  const { type } = use(params); // ✅ 동적 라우팅된 type 값을 받아옴
  return <MapSelectLocationPage type={type} />;
}
