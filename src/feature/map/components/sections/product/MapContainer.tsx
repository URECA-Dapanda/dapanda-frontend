"use client";

import { useEffect, useRef } from "react";
import { useMapInitializer } from "@/feature/map/hooks/useMapInitializer";
import { useMapMarkers } from "@/feature/map/hooks/useMapMarkers";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { MAP_CONTAINER_ID } from "@/feature/map/constants/map";
import { useMyLocation } from "@feature/map/hooks/useMyLocation";
import { useMapRefresh } from "@/feature/map/hooks/useMapRefresh";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMapHeight } from "@hooks/useMapHeight";

export default function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMapStore((state) => state.map);
  const storeList = useMapStore((state) => state.storeList);
  const selectedStore = useMapStore((state) => state.selectedStore);
  const setSelectedStore = useMapStore((state) => state.setSelectedStore);
  const { mapHeight, footerHeight } = useMapHeight();

  useMapInitializer();
  useMapRefresh(map);
  useMyLocation(map);

  useMapMarkers(map, storeList, {
    onMarkerClick: (store) => {
      setSelectedStore(store);
    },
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.id = MAP_CONTAINER_ID;
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    const updateMapSize = () => {
      const mapWidth = mapRef.current?.offsetWidth ?? window.innerWidth;
      const heightValue = parseInt(mapHeight.replace(/\D/g, ""));

      map.setSize(new window.naver.maps.Size(mapWidth, heightValue));

      const fullWidth = window.innerWidth;
      const offsetX = (fullWidth - mapWidth) / 2;

      const isDesktop = fullWidth > 768;
      if (isDesktop && offsetX > 0) {
        map.panBy(new naver.maps.Point(-offsetX, 0));
      }
    };

    updateMapSize();
  }, [map, mapHeight]);

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />

      <AnimatePresence>
        {selectedStore && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-24 left-0 w-full px-24 z-50"
            style={{ bottom: footerHeight }}
          >
            <div className="bg-white rounded-2xl shadow-lg pt-32 px-16 pb-16 relative">
              <button
                className="absolute top-8 right-8 text-gray-400"
                onClick={() => setSelectedStore(null)}
              >
                <X className="w-20 h-20" />
              </button>
              <MapItemCard data={selectedStore} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
