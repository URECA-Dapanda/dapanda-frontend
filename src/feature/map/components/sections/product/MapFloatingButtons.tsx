import { PlusIcon, ListIcon, LocateFixed } from "lucide-react";
import { ButtonComponent } from "@components/common/button";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onOpenModal: () => void;
  onOpenSheet: () => void;
  isSnapOpen: boolean;
}

export default function MapFloatingButtons({ onOpenModal, onOpenSheet, isSnapOpen }: Props) {
  const { map } = useMapStore();

  const handleGoToCurrentLocation = () => {
    if (!map || !window.naver) return;
    navigator.geolocation?.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const location = new window.naver.maps.LatLng(latitude, longitude);
        map.setCenter(location);
        map.setZoom(15);
      },
      () => alert("위치 정보를 가져올 수 없습니다."),
      { enableHighAccuracy: true }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        key="floating-register"
        className="absolute top-24 right-24 z-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isSnapOpen ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <ButtonComponent variant="floatingPrimary" size="xl" onClick={onOpenModal}>
          <PlusIcon className="w-20 h-20 mr-4" />
          등록
        </ButtonComponent>
      </motion.div>

      <motion.div
        key="floating-list"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={isSnapOpen ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <ButtonComponent variant="floatingOutline" size="xl" onClick={onOpenSheet}>
          <ListIcon className="w-20 h-20 mr-4" />
          목록 보기
        </ButtonComponent>
      </motion.div>

      <motion.div
        key="floating-location"
        className="absolute bottom-24 left-1/8 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={isSnapOpen ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <ButtonComponent variant="floatingOutline" size="xl" onClick={handleGoToCurrentLocation}>
          <LocateFixed className="w-20 h-20" />
        </ButtonComponent>
      </motion.div>
    </AnimatePresence>
  );
}
