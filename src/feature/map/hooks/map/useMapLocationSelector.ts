import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
import { getAddressVariantsFromLatLng } from "@/feature/map/utils/reverseGeocode";

export interface NaverPlaceItem {
  title: string;
  address: string;
  mapx: string;
  mapy: string;
}

export function useMapLocationSelector(type: "wifi" | "hotspot") {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<{
    lat: number;
    lng: number;
    roadAddress: string;
    jibunAddress?: string;
    postalCode?: string;
  } | null>(null);

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NaverPlaceItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // edit or lat/lng 쿼리 기반 초기 selected 설정
  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const address = searchParams.get("address");
    const isEdit = searchParams.get("edit") === "true";
    const productId = searchParams.get("productId");

    if (lat && lng && address) {
      setSelected({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        roadAddress: decodeURIComponent(address),
      });
    } else if (isEdit && productId) {
      getMapDetailById(productId).then((data) => {
        setSelected({
          lat: data.latitude,
          lng: data.longitude,
          roadAddress: data.address,
        });
      });
    }
  }, [searchParams]);

  // 검색어 입력 시 자동완성
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!searchQuery || !isSearchMode) return setSearchResults([]);
      fetch(`/api/naver-search?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.items ?? []))
        .catch(() => setSearchResults([]));
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery, isSearchMode]);

  const handleSearchToggle = () => {
    setIsSearchMode((prev) => !prev);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  const handleAddressSelect = async (item: NaverPlaceItem) => {
    const lat = parseFloat(item.mapy) / 1e7;
    const lng = parseFloat(item.mapx) / 1e7;
    const address = item.address || item.title.replace(/<[^>]+>/g, "");

    const variants = await getAddressVariantsFromLatLng(lat, lng);

    setSelected({
      lat,
      lng,
      roadAddress: variants?.roadAddress ?? address,
      jibunAddress: variants?.jibunAddress,
      postalCode: variants?.postalCode,
    });

    setSearchQuery(item.title.replace(/<[^>]+>/g, ""));
    setSearchResults([]);
    setIsSearchMode(false);
  };

  const handleMapLocationSelect = useCallback(async (lat: number, lng: number) => {
    const variants = await getAddressVariantsFromLatLng(lat, lng);

    setSelected({
      lat,
      lng,
      roadAddress: variants?.roadAddress ?? "주소 없음",
      jibunAddress: variants?.jibunAddress,
      postalCode: variants?.postalCode,
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchMode || searchResults.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleAddressSelect(searchResults[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsSearchMode(false);
      setSearchResults([]);
    }
  };

  const handleNext = () => {
    if (!selected) return alert("위치를 선택해주세요");
    const { lat, lng, roadAddress } = selected;
    const edit = searchParams.get("edit");
    const productId = searchParams.get("productId");

    const baseUrl = `/map/regist/${type}/form`;
    const query = `lat=${lat}&lng=${lng}&address=${encodeURIComponent(roadAddress)}`;
    const editParams = edit === "true" && productId ? `&edit=true&id=${productId}` : "";

    router.replace(`${baseUrl}?${query}${editParams}`);
  };

  const initialLocation = useMemo(
    () => (selected ? { lat: selected.lat, lng: selected.lng } : undefined),
    [selected?.lat, selected?.lng]
  );

  return {
    selected,
    isSearchMode,
    searchQuery,
    searchResults,
    selectedIndex,
    initialLocation,
    setSearchQuery,
    setSelectedIndex,
    handleNext,
    handleSearchToggle,
    handleKeyDown,
    handleAddressSelect,
    handleMapLocationSelect,
  };
}
