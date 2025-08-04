import { MailCheck } from "lucide-react";

const VerifyEmail = () => {
  const email = localStorage.getItem("verify-email") || "";
  return (
    <div className=" h-full flex  py-20 justify-center px-4">
      <div className="bg-white border rounded-lg w-full mt-10 h-fit max-w-md px-10 py-10 text-center">
        <div className="flex justify-center mb-2">
          <MailCheck className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Xác thực email</h2>
        <p className="mt-2 text-gray-600 font-medium text-[15px]">
          Chúng tôi đã gửi một email đến {email}. Vui lòng kiểm tra và nhấn vào
          liên kết để kích hoạt tài khoản.
        </p>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Không nhận được email?{" "}
            <button className="text-blue-600 hover:underline cursor-pointer">
              Gửi lại
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
