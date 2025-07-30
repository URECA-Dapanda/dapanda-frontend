import { PlusIcon, ListIcon, LocateFixed } from "lucide-react";
import { ButtonComponent } from "@components/common/button";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useMemo } from "react";

interface Props {
  onOpenModal: () => void;
  onOpenSheet: () => void;
  isSnapOpen: boolean;
  mapHeight?: string;
}

export default function MapFloatingButtons({
  onOpenModal,
  onOpenSheet,
  isSnapOpen,
  mapHeight,
}: Props) {
  const { map } = useMapStore();

  // 헤더/푸터 높이를 기반으로 동적 위치 계산
  const dynamicPositions = useMemo(() => {
    // SSR에서는 기본값 사용
    if (typeof window === "undefined") {
      return {
        registerTop: `${56}px`, 
        bottomButtonsBottom: `${56}px`, 
      };
    }

    const header = document.getElementById("appHead");
    const footer = document.getElementById("appFooter");

    const headerHeight = header?.offsetHeight ?? 56; 
    const footerHeight = footer?.offsetHeight ?? 56; 

    return {
      registerTop: `${headerHeight}px`,
      bottomButtonsBottom: `${footerHeight}px`,
    };
  }, [mapHeight]); // mapHeight가 변경되면 다시 계산

  const handleGoToCurrentLocation = () => {
    if (!map || !window.naver) return;
    navigator.geolocation?.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const location = new window.naver.maps.LatLng(latitude, longitude);
        map.setCenter(location);
        map.setZoom(15);
      },
      () => toast.error("위치 정보를 가져올 수 없습니다."),
      { enableHighAccuracy: true }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        key="floating-register"
        className="absolute top-24 right-24 z-50"
        style={{ top: dynamicPositions.registerTop }}
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
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: dynamicPositions.bottomButtonsBottom }}
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
        className="absolute bottom-24 left-1/8 -translate-x-1/2 z-10"
        style={{ bottom: dynamicPositions.bottomButtonsBottom }}
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
