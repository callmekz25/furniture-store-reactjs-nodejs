import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0  flex items-center max-h-screen max-w-full justify-center z-50">
      <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
    </div>
  );
};

export default Loading;
