import { Loader2 } from "lucide-react";

const TransparentLoading = () => {
  return (
    <div className="absolute inset-0  flex items-center max-h-screen justify-center z-50">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );
};

export default TransparentLoading;
