'use client';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function EmailSent() {
  return (
    <div className='bg-simple-1 mt-24 flex  h-full w-full items-center justify-center lg:mt-0 lg:h-[80vh]'>
      <div className='mx-3 rounded-xl border bg-white p-6 text-center shadow sm:mx-auto sm:p-8'>
        <CheckCircleIcon className=' mx-auto mb-3 h-16 text-green-500' />
        <div className=' flex flex-col gap-y-3'>
          <p className='text-2xl font-semibold'>لینک ارسال شد</p>
          <p>
            اگر ایمیل شما در سامانه ما ثبت شده باشد، ایمیل تغییر رمز برای شما
            ارسال خواهد شد
          </p>
          <p>لطفا برای ادامه فرآیند ایمیل خود را چک کنید.</p>
        </div>
      </div>
    </div>
  );
}
