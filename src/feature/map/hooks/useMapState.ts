import { useState } from "react";

export const useMapPageState = () => {
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("가까운 순");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    isSnapOpen,
    setIsSnapOpen,
    sortLabel,
    setSortLabel,
    availableOnly,
    setAvailableOnly,
    isModalOpen,
    setIsModalOpen,
  };
};
