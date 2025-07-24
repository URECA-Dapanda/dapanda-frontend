"use client";

import RegistLocation from "@/feature/map/components/pages/RegistLocation";
import { use } from "react";

export default function RegistLocationPage({
  params,
}: {
  params: Promise<{ type: "hotspot" | "wifi" }>;
}) {
  const { type } = use(params); 
  return <RegistLocation type={type} />;
}
