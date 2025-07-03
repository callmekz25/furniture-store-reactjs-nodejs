import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ProgressLoading = ({
  duration,
  resetKey,
}: {
  duration: number;
  resetKey: number;
}) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(timerRef.current!);
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetKey]);

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-[2px] bg-gray-300 z-[999999]">
      <div
        className="h-full bg-red-600  transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>,
    document.body
  );
};

export default ProgressLoading;
