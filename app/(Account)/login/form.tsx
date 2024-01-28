'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEX } from '@/utils/regex';
import toast from 'react-hot-toast';
import useLogin from './useLogin';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import Input from '@/components/daisy/input';
import Button from '@/components/daisy/button';
import { useEffect } from 'react';

const LoginForm = () => {
  const { login, loading } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      usernameOrEmail: Yup.string().required(),
      password: Yup.string().matches(REGEX.PASSWORD).required(),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      const { usernameOrEmail, password } = values;
      await login(usernameOrEmail, password)
        .then((response) => {
          const { json, res } = response;
          if (!res.ok) {
            return toast.error(json.message);
          }
          router.replace('/account');
          toast.success(json.message);
        })
        .catch((e) => {
          toast.error('خطایی رخ داد');
        });
    },
  });

  useEffect(() => {
    if (searchParams.has('notAuthenticated')) {
      toast.error('لطفا ابتدا وارد حساب کاربری خود شوید');
    }
  }, [searchParams]);

  return (
    <div className='bg-simple-1 mt-24 flex flex-wrap items-baseline sm:relative sm:items-center lg:mt-0 lg:h-[80vh]'>
      {/* <HeaderSimple /> */}

      <div className='relative mx-3 w-full rounded-xl border border-t-[4px] border-t-yellow-500 bg-white p-6 shadow sm:mx-auto sm:w-2/4 sm:p-8 md:w-2/4 lg:w-4/12'>
        <div className='absolute -top-[52px] left-10'>
          <Image
            src={'/images/bird-symbol.png'}
            width={50}
            height={50}
            alt='Koochaa Bird Symbol'
          />
        </div>
        <h1 className='mb-4 text-lg font-semibold text-primary'>
          ورود به حساب کاربری
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='grid gap-3'>
            <Input
              bordered
              type='text'
              name='usernameOrEmail'
              onChange={formik.handleChange}
              placeholder='نام کاربری یا ایمیل'
              endContent={<UserIcon className='h-7 w-7 text-gray-400' />}
            />
            <Input
              bordered
              type='password'
              name='password'
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password}
              errorMessage={
                !!formik.errors.password &&
                'رمز باید حداقل ۸ کارکتر و شامل حداقل یک حرف بزرگ و یک عدد باشد'
              }
              placeholder='رمز عبور'
              endContent={<LockClosedIcon className='h-7 w-7 text-gray-400' />}
            />
          </div>
          <div className='mt-3'>
            <p className='text-[15px] text-blue-800'>
              <Link href={'/resetPassword'}>رمز عبورم را فراموش کردم.</Link>
            </p>
            <Button
              type='submit'
              className='btn-primary my-6 w-full text-white'
              color='primary'
              isLoading={loading}
            >
              ورود کاربر
            </Button>
            <p className='text-[15px]'>
              حساب کاربری ندارید؟{' '}
              <Link href={'/register'} className='font-medium text-blue-800'>
                اینجا کلیک کنید
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
