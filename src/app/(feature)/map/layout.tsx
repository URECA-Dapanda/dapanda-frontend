"use client";

import { ReactNode } from "react";
import Script from "next/script";

export default function MapLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        onLoad={() => {
          const script = document.createElement("script");
          script.src = "/scripts/MarkerClustering.js";
          script.async = true;
          document.body.appendChild(script);
        }}
      />
      {children}
    </>
  );
}
