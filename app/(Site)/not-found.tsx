'use client';

import Image from 'next/image';

export default function NotFound() {
    return (
        <div className='container mx-auto mt-8 max-w-[1144px]'>
            <div className='not-found flex min-h-[500px] flex-wrap items-center justify-center'>
                <div className='wrap'>
                    <div className='flex justify-center'>
                        <Image
                            src='/images/not-found-01.png'
                            alt='404 Error Iamge'
                            width={260}
                            height={200}
                        />
                    </div>
                    <h1 className='mt-4 text-center text-lg font-semibold text-yellow-900 sm:text-2xl'>
                        متاسفانه چنین صفحه‌ای وجود نداره!
                    </h1>
                    <p className='my-3 px-5 text-center text-blue-900 sm:px-0 sm:text-lg'>
                        و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر
                        کرده باشه.
                    </p>
                    <p className='px-8 text-center font-light text-gray-600 sm:px-0 sm:text-lg'>
                        با انتخاب کشور مورد نظرت می‌تونی به جستجو ادامه بدی.
                    </p>
                </div>
            </div>
        </div>
    );
}
