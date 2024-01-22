"use client";

import { REGEX } from "@/utils/regex";
import axios, { AxiosRequestConfig } from "axios";
import { useFormik } from "formik";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/daisy/input";
import {
  EnvelopeIcon,
  FaceSmileIcon, LockClosedIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/daisy/button";
import useRegisterUser from "./useRegisterUser";
import Select from "@/components/daisy/select";
import useSWR from "swr";
import { fetcher } from "@/app/swr/fetcher";
import { CountryNamespace } from "@/types/country";
import Option from "@/components/daisy/option";
import { CircleFlag } from "next-circle-flags";
// import HeaderSimple from "../layout/header-sm";

export type FormikValues = {
  firstname: string;
  username: string;
  password: string;
  lastname: string;
  email: string;
  countryId: string | number;
};
export default function RegisterForm() {


  const {data: countries, isLoading: countriesLoading, error: countriesError} = useSWR<CountryNamespace.GET[]>(`${process.env.NEXT_PUBLIC_API_URL}/countries`, fetcher)

  useEffect(() => {
    console.log(countries);
  }, [countries])

  const { executeRecaptcha } = useReCaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const { registerUser, registerUserLoading } = useRegisterUser()

  const formik = useFormik<FormikValues>({
    initialValues: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      countryId: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().matches(REGEX.USERNAME).required(),
      email: Yup.string().email().required(),
      password: Yup.string().matches(REGEX.PASSWORD).required(),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      countryId: Yup.mixed().required()
    }),
    validateOnMount: false,
    onSubmit: async (values) => {
      console.log(values);      
      // const captchaToken = await executeRecaptcha("user_signup");
      // console.log(captchaToken);      
      await registerUser(values, 'captchaToken')
    },
  });

  return (
    <div className="min-h-full flex flex-wrap items-baseline sm:items-center bg-simple-1 sm:relative">
      {/* <HeaderSimple /> */}

      <div className="w-full sm:w-2/5 mx-3 my-20 sm:mx-auto bg-white p-6 sm:p-8 rounded-xl shadow border border-t-[4px] border-t-yellow-500 relative">
        <div className="absolute left-10 -top-[52px]">
          <Image
            src={"/images/bird-symbol.png"}
            width={50}
            height={50}
            alt="Koocha Bird Symbol"
          />
        </div>
        <h1 className="mb-4 font-semibold text-lg">ثبت حساب کاربری جدید</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 gap-3">
            <Input
              name="firstname"
              autoComplete="organization-title"
              onChange={formik.handleChange}
              className="col-span-4 sm:col-span-2"
              type="text"
              placeholder="نام"
              bordered={true}
              isInvalid={!!formik.errors.firstname}
              endContent={<FaceSmileIcon className="h-7 w-7 text-gray-400" />}
            />
            <Input
              name="lastname"
              autoComplete="organization-title"
              onChange={formik.handleChange}
              className="col-span-4 sm:col-span-2"
              type="text"
              placeholder="نام خانوادگی"
              bordered={true}
              isInvalid={!!formik.errors.lastname}
              endContent={<FaceSmileIcon className="h-7 w-7 text-gray-400" />}
            />
            <Input
              name="username"
              autoComplete="new-username"
              onChange={formik.handleChange}
              type="text"
              className="col-span-4 sm:col-span-2"
              placeholder="نام کاربری"
              bordered={true}
              isInvalid={!!formik.errors.username}
              errorMessage={
                !!formik.errors.username &&
                "یوزرنیم فقط میتواند شامل عدد، حروف انگلیسی و علامت های نقطه(.) و خط تیره (-) باشد"
              }
              endContent={<UserIcon className="h-7 w-7 text-gray-400" />}
            />
            <Input
              name="email"
              autoComplete="new-email"
              onChange={formik.handleChange}
              className="col-span-4 sm:col-span-2"
              type="email"
              placeholder="ایمیل"
              bordered={true}
              isInvalid={!!formik.errors.email}
              errorMessage="ایمیل را درست وارد کنید"
              endContent={<EnvelopeIcon className="h-7 w-7 text-gray-400" />}
            />
            <Input
              name="password"
              autoComplete="new-password"
              onChange={formik.handleChange}
              type="password"
              className="col-span-2"
              placeholder="رمز عبور"
              bordered={true}
              isInvalid={!!formik.errors.password}
              errorMessage="رمز باید حداقل ۸ کارکتر و شامل حداقل یک حرف بزرگ و یک عدد باشد"
              endContent={<LockClosedIcon className="h-7 w-7 text-gray-400" />}
            />
            <Select items={countries} value={formik.values.countryId} isInvalid={!!formik.errors.countryId} errorMessage='لطفا کشور خود را انتخاب کنید' bordered className="col-span-2">
              {
                (country: any) => (
                  <Option startContent={<CircleFlag countryCode={country.code} width={20} height={20}/>} onClick={() => formik.setFieldValue('countryId', country.id)} key={country.code} value={country.name}>{country.name}</Option>
                )
              }
            </Select>
          </div>

          <Button type="submit" onClick={() => formik.handleSubmit()} isLoading={registerUserLoading}  className="btn btn-primary my-6 w-full" >
            ثبت نام کاربر
          </Button>

          <p className="text-[15px]">
            حساب کاربری دارید؟{" "}
            <Link href={"/login"} className="font-medium text-blue-700">
              اینجا کلیک کنید
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
