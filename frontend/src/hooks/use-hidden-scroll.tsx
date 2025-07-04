import { useEffect } from "react";

const useHiddenScroll = (isOpen: boolean): void => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
};

export default useHiddenScroll;
