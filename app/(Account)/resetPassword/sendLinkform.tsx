'use client';
import React, { useEffect, useState } from 'react';
import useSendResetPassword from './useSendResetPassword';
import EmailSent from './emailSent';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Input from '@/components/daisy/input';
import Button from '@/components/daisy/button';
import toast from 'react-hot-toast';

export default function SendLinkForm() {
  const { loading, sendResetPassword, emailSent, error } =
    useSendResetPassword();
  const [email, setEmail] = useState<string>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Check email validity (you can use your own validation logic)
    const isValidEmail = /\S+@\S+\.\S+/.test(newEmail);
    setIsEmailValid(isValidEmail);
  };

  useEffect(() => {
    if (!error) return;
    const data = error?.response?.data as { message?: string };
    toast.error(data?.message || 'خطایی پیش آمد');
  }, [error]);

  if (emailSent) {
    return <EmailSent />;
  }

  return (
    <div className='bg-simple-1 mt-24 flex flex-wrap items-baseline sm:relative sm:items-center lg:mt-0 lg:h-[80vh]'>
      {/* <HeaderSimple /> */}

      <div className='relative mx-3 w-full rounded-xl border border-t-[4px] border-t-yellow-500 bg-white p-6 shadow sm:mx-auto sm:w-2/4 sm:p-8 md:w-2/4 lg:w-4/12'>
        <div className='absolute -top-[52px] left-10'>
          <Image
            src={'/images/bird-symbol.png'}
            width={50}
            height={50}
            alt='Koocha Bird Symbol'
          />
        </div>
        <h1 className='mb-2 text-lg font-semibold'>تغییر رمز عبور</h1>
        <p className='mb-4 text-gray-500'>
          لینک ایجاد رمز عبور جدید به ایمیل شما ارسال خواهد شد.
        </p>
        <form onClick={(e) => e.preventDefault()}>
          <Input
            onChange={emailChangeHandler}
            placeholder='ایمیل'
            bordered
            type='email'
            className='text-center'
            endContent={<EnvelopeIcon className='h-7 w-7 text-gray-400' />}
          />
          <Button
            onClick={() => sendResetPassword(email!)}
            type='submit'
            className='btn-primary my-3 w-full'
            color='primary'
            isLoading={loading}
            isDisabled={!isEmailValid}
          >
            ارسال لینک
          </Button>
        </form>
      </div>
    </div>
  );
}
