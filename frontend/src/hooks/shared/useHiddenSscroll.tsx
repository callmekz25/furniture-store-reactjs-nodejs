import { useEffect } from "react";

const useHiddenScroll = (isOpen: boolean): void => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Chặn cuộn
    } else {
      document.body.style.overflow = ""; // Bỏ chặn cuộn
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup khi unmount
    };
  }, [isOpen]);
};

export default useHiddenScroll;
