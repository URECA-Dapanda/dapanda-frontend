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

export default function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMapStore((state) => state.map);
  const storeList = useMapStore((state) => state.storeList);
  const selectedStore = useMapStore((state) => state.selectedStore);
  const setSelectedStore = useMapStore((state) => state.setSelectedStore);

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

  return (
    <>
      <div ref={mapRef} className="w-full  h-sheet-safe" />

      <AnimatePresence>
        {selectedStore && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 lg:w-[600px] mx-auto pb-safe-bottom w-full px-24 z-50"
          >
            <div className="flex justify-end mb-8 pr-8">
              <button
                className="bg-white rounded-full shadow-md p-8"
                onClick={() => setSelectedStore(null)}
              >
                <X className="w-20 h-20 text-gray-500" />
              </button>
            </div>
            <MapItemCard data={selectedStore} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
