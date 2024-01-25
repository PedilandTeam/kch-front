"use client";

import { REGEX } from "@/utils/regex";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import Image from "next/image";
import Input from "@/components/daisy/input";
import {
  EnvelopeIcon,
  FaceSmileIcon, LockClosedIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/daisy/button";
import useRegisterUser from "./useRegisterUser";
import useSWR from "swr";
import { fetcher } from "@/app/swr/fetcher";
import { CountryNamespace } from "@/types/country";
import SelectWithFetching from "@/components/daisy/selectWithFetching";
import useRecaptchaV3 from "@/hooks/useRecaptchaV3";
import { useEffect } from "react";
import { ReCaptchaV3Provider } from "@/components/global/recaptchaV3Provider";

export type FormikValues = {
  firstname: string;
  username: string;
  password: string;
  lastname: string;
  email: string;
  countryId: string | number;
  cityId: string | number;
};
export default function RegisterForm() {

  const {executeRecaptcha} = useRecaptchaV3()


  // const { executeRecaptcha } = useReCaptcha('user_signup');
  const { registerUser, registerUserLoading } = useRegisterUser()

  const formik = useFormik<FormikValues>({
    initialValues: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      countryId: "",
      cityId: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().matches(REGEX.USERNAME).required(),
      email: Yup.string().email().required(),
      password: Yup.string().matches(REGEX.PASSWORD).required(),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      countryId: Yup.string().required('انتخاب کشور ضروری است'),
      cityId: Yup.string().required('انتخاب شهر ضروری است')
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      const token = await executeRecaptcha("user_signup");
      await registerUser(values, token)
    },
  });
  return (
    <ReCaptchaV3Provider>
        <div className="lg:h-[80vh] mt-24 lg:mt-0 flex flex-wrap items-baseline sm:items-center bg-simple-1 sm:relative">
            {/* <HeaderSimple /> */}

            <div className="w-full sm:w-3/4 md:w-3/4 lg:w-6/12 mx-3 sm:mx-auto bg-white p-6 sm:p-8 rounded-xl shadow border border-t-[4px] border-t-yellow-500 relative">
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

              <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} />
              {/* <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} /> */}
              <SelectWithFetching bordered value={formik.values.cityId} className="col-span-2" route={formik.values?.countryId ? `/cities?page=1&limit=100&countryId=${formik.values?.countryId}` : ''} label="شهر" name="cityId" isDisabled={!formik.values?.countryId} paginated setFieldValue={formik.setFieldValue} formErrors={formik.errors} />

              <Input
                name="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                type="password"
                className="col-span-4"
                placeholder="رمز عبور"
                bordered={true}
                isInvalid={!!formik.errors.password}
                errorMessage="رمز باید حداقل ۸ کارکتر و شامل حداقل یک حرف بزرگ و یک عدد باشد"
                endContent={<LockClosedIcon className="h-7 w-7 text-gray-400" />}
              />
            </div>

            <Button type="submit" isLoading={registerUserLoading} className="btn btn-primary my-6 w-full" >
              ثبت نام کاربر
            </Button>

            <p className="text-[15px]">
              حساب کاربری دارید؟{" "}
              <Link href={"/login"} className="font-medium text-primary">
                اینجا کلیک کنید
              </Link>
            </p>
          </form>
        </div>
      </div>
    </ReCaptchaV3Provider>
  );
}
