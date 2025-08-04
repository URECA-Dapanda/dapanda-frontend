import { useEffect, useState } from "react";

export const useKeyboardDetection = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    let initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const threshold = window.innerWidth <= 768 ? 0.7 : 0.8;
      const isKeyboard = currentHeight < initialHeight * threshold;
      setIsKeyboardVisible(isKeyboard);
    };

    initialHeight = window.innerHeight;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isKeyboardVisible;
};
