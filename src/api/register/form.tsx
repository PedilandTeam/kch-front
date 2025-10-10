"use client";

import { REGEX } from "@/utils/regex";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import Image from "next/image";
import useRegisterUser from "./useRegisterUser";
import useRecaptchaV3 from "@/hooks/useRecaptchaV3";
import { ReCaptchaV3Provider } from "@/components/global/recaptchaV3Provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@components";

export type FormikValues = {
  firstname: string;
  username: string;
  password: string;
  lastname: string;
  email: string;
  countryId: string | number;
  cityObject: string | number;
  cityId?: string | number;
};
export default function RegisterForm() {
  const { executeRecaptcha } = useRecaptchaV3();

  const router = useRouter();

  // const { executeRecaptcha } = useReCaptcha('user_signup');
  const { registerUser, registerUserLoading } = useRegisterUser();

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
      countryId: Yup.string().required("انتخاب کشور ضروری است"),
      // cityObject: Yup.mixed().required('انتخاب شهر ضروری است'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      const token = await executeRecaptcha("user_signup");
      const res = await registerUser(values, token);
      router.push("/account");
    },
  });

  useEffect(() => {}, [formik.values]);

  return (
    <ReCaptchaV3Provider>
      <div className="bg-simple-1 mt-24 flex flex-wrap items-baseline sm:relative sm:items-center lg:mt-0 lg:h-[80vh]">
        {/* <HeaderSimple /> */}

        <div className="relative mx-3 w-full rounded-xl border border-t-[4px] border-t-yellow-500 bg-white p-6 shadow sm:mx-auto sm:w-3/4 sm:p-8 md:w-3/4 lg:w-6/12">
          <div className="absolute -top-[52px] left-10">
            <Image
              src={"/images/bird-symbol.png"}
              width={50}
              height={50}
              alt="Koocha Bird Symbol"
            />
          </div>
          <h1 className="mb-4 text-lg font-semibold">ثبت حساب کاربری جدید</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-4 gap-3">
              <Input
                name="firstname"
                autoComplete="organization-title"
                onChange={formik.handleChange}
                className="col-span-4 sm:col-span-2"
                type="text"
                placeholder="نام"
              />
              <Input
                name="lastname"
                autoComplete="organization-title"
                onChange={formik.handleChange}
                className="col-span-4 sm:col-span-2"
                type="text"
                placeholder="نام خانوادگی"
              />
              <Input
                name="username"
                autoComplete="new-username"
                onChange={formik.handleChange}
                type="text"
                className="col-span-4 sm:col-span-2"
                placeholder="نام کاربری"
              />
              <Input
                name="email"
                autoComplete="new-email"
                onChange={formik.handleChange}
                className="col-span-4 sm:col-span-2"
                type="email"
                placeholder="ایمیل"
              />

              {/* <SelectWithFetching
                bordered
                value={formik.values.countryId}
                circleFlag
                className="col-span-2"
                route="/countries"
                label="انتخاب کشور"
                name="countryId"
                setFieldValue={formik.setFieldValue}
                formErrors={formik.errors}
              /> */}
              {/* <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} /> */}
              {/* <SelectCity
                bordered
                value={formik.values.cityObject}
                className="col-span-2"
                label="شهر"
                name="cityObject"
                isDisabled={!formik.values?.countryId}
                paginated
                setFieldValue={formik.setFieldValue}
                formErrors={formik.errors}
                searchAble
                infiniteScroll
                countryId={formik.values?.countryId}
              /> */}

              <Input
                name="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                type="password"
                className="col-span-4"
                placeholder="رمز عبور"
              />
            </div>

            <Button type="submit" className="btn btn-primary my-6 w-full">
              ثبت نام کاربر
            </Button>

            <p className="text-[15px]">
              حساب کاربری دارید؟{" "}
              <Link href={"/login"} className="text-primary font-medium">
                اینجا کلیک کنید
              </Link>
            </p>
          </form>
        </div>
      </div>
    </ReCaptchaV3Provider>
  );
}
