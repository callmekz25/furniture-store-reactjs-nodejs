import Lottie from "lottie-react";
import { Check } from "lucide-react";
import successAnimation from "@/assets/animations/successful.json";

const SuccessAnimation = () => {
  return (
    <div className="flex flex-col w-full items-center h-full">
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={successAnimation}
          loop={false}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className=" bg-green-600 bg-opacity-90 rounded-full size-16 flex items-center justify-center shadow-lg border-4 border-green-200 pointer-events-none">
        <Check className="text-white w-9 h-9" strokeWidth={2} />
      </div>
    </div>
  );
};

export default SuccessAnimation;
