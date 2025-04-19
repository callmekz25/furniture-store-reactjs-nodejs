import { useState } from "react";
import { useEffect } from "react";

const useCheckScreen = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return isMobile;
};

export default useCheckScreen;
