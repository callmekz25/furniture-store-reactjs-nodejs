import { useEffect, useState } from "react";

const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  useEffect(() => {
    const checkSize = () => {
      const widthScreen = window.innerWidth;

      if (widthScreen >= 1024) {
        setItemsPerView(3);
      } else if (widthScreen >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return itemsPerView;
};

export default useItemsPerView;
