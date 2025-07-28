"use client";

import MapSelectLocationPage from "@/feature/map/components/pages/MapSelectLocation";
import { use } from "react";

export default function RegistLocationPage({
  params,
}: {
  params: Promise<{ type: "hotspot" | "wifi" }>;
}) {
  const { type } = use(params);
  return <MapSelectLocationPage type={type} />;
}
