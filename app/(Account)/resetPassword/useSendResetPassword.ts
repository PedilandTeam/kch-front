import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useSendResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  const sendResetPassword = (email: string) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/resetPassword?email=${email}&type=user`
      )
      .then(() => {
        setEmailSent(true);
        toast.success('لینک تغییر رمز عبور ارسال شد');
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    sendResetPassword,
    emailSent,
    error,
  };
}
