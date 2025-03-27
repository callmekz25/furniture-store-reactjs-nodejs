import { useEffect, useState } from "react";

const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  useEffect(() => {
    const checkSize = () => {
      setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return itemsPerView;
};

export default useItemsPerView;
