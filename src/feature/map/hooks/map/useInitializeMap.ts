import { useEffect, useState, RefObject } from "react";

export function useInitializeMap(ref: RefObject<HTMLDivElement | null>) {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const timer = setTimeout(() => {
      if (ref.current && window.naver) {
        const mapInstance = new window.naver.maps.Map(ref.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 14,
        });
        setMap(mapInstance);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [ref]);

  return map;
}
