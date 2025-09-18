import { MailCheck } from 'lucide-react';
import Error from '../shared/error';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { useResendEmailVerification, useVerifyEmail } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const VerifyEmail = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email') || null;
  const [otp, setOtp] = useState<string>('');
  const { mutate: verifyEmail, isPending: isPendingVerify } = useVerifyEmail();
  const { mutate: resendEmail, isPending: isPendingResend } =
    useResendEmailVerification();
  if (!email) {
    return <Error />;
  }

  return (
    <div className=" h-full flex  py-20 justify-center px-4">
      <div className="bg-white border rounded-lg w-full mt-6 h-fit max-w-md px-10 py-10 text-center">
        <div className="flex justify-center mb-2">
          <MailCheck className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Xác thực email</h2>
        <p className="mt-2 text-gray-600 font-medium text-md">
          Chúng tôi đã gửi mã xác thực đến {email}. Vui lòng kiểm tra email của
          bạn.
        </p>
        <div className="flex items-center justify-center mt-4">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            className={`${isPendingVerify ? ' cursor-not-allowed' : ''}`}
            readOnly={isPendingVerify}
            onChange={setOtp}
            onComplete={(value) => {
              if (!isPendingVerify && email) {
                verifyEmail(value, {
                  onSuccess: () => {
                    toast.success('Xác thực email thành công', {
                      position: 'top-right',
                    });
                    setTimeout(() => {
                      navigate('/signin', { replace: true });
                      sessionStorage.removeItem('email');
                    }, 200);
                  },
                });
              }
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="font-semibold text-lg" />
              <InputOTPSlot index={1} className="font-semibold text-lg" />
              <InputOTPSlot index={2} className="font-semibold text-lg" />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} className="font-semibold text-lg" />
              <InputOTPSlot index={4} className="font-semibold text-lg" />
              <InputOTPSlot index={5} className="font-semibold text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Không nhận được email?{' '}
            <button
              disabled={isPendingResend}
              onClick={() => {
                resendEmail(undefined, {
                  onSuccess: () => {
                    toast.success('Gửi email xác thực thành công');
                  },
                });
              }}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Gửi lại
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
