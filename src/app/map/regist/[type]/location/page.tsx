// src/app/map/regist/[type]/location/page.tsx
"use client";

import RegistLocation from "@/feature/map/components/pages/RegistLocation";
import { use } from "react";

export default function RegistLocationPage({
  params,
}: {
  params: Promise<{ type: "hotspot" | "wifi" }>;
}) {
  const { type } = use(params); // ✅ use()로 unwrap

  return <RegistLocation type={type} />;
}
