"use client";

import { REGEX } from "@/utils/regex";
import axios, { AxiosRequestConfig } from "axios";
import { useFormik } from "formik";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/daisy/input";
import Button from "@/components/daisy/button";
// import HeaderSimple from "@/app/(Site)/layout/header-sm";

export type FormikValues = {
  firstname: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
  email: string;
};
export default function RegisterForm({
  slug,
  claimWay,
}: {
  slug?: string;
  claimWay?: string;
}) {
  const { executeRecaptcha } = useReCaptcha();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik<FormikValues>({
    initialValues: {
      username: "",
      password: "",
      name: "",
      lastname: "",
      email: "",
      firstname: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().matches(REGEX.USERNAME).required(),
      email: Yup.string().email().required(),
      password: Yup.string().matches(REGEX.PASSWORD).required(),
      name: Yup.string().required(),
      lastname: Yup.string().required(),
    }),
    validateOnMount: false,
    onSubmit: async ({
      username,
      password,
      firstname,
      lastname,
      email,
    }: FormikValues) => {
      setLoading(true);
      const token = await executeRecaptcha("business_signup");

      let config: AxiosRequestConfig = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/business/signup`,
        method: "POST",
        withCredentials: true,
        data: {
          firstname,
          username,
          email,
          password,
          token,
          ...(slug && { slug }),
          ...(claimWay && { claimWay }),
          lastname,
        },
      };
      await axios(config)
        .then((res) => {
          toast.success(res.data?.message);
          if (!claimWay && !slug) {
            router.push("/home");
            return;
          }
          router.push("/home");
        })
        .catch((e) => {
          toast.error(e?.response?.data?.message || "خطایی رخ داده است");
        });
      setLoading(false);
    },
  });

  return (
    <div className="flex flex-wrap items-baseline min-h-full sm:items-center bg-simple-1 sm:relative">
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
        <h1 className="mb-4 text-lg font-semibold">ثبت حساب کاربری جدید</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 gap-3">
            <Input
              name="name"
              autoComplete="organization-title"
              onChange={formik.handleChange}
              className="col-span-4 sm:col-span-2"
              type="text"
              placeholder="نام"
              bordered={true}
              isInvalid={!!formik.errors.name}
              errorMessage="نام را درست وارد کنید"
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
              errorMessage="نام خانوادگی را درست وارد کنید"
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
              errorMessage="یوزرنیم را درست وارد کنید"
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
            />
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
            />
          </div>

          <Button isLoading={loading} className="w-full my-6 btn btn-primary" />

          <p className="text-[15px]">
            حساب کاربری دارید؟{" "}
            <Link href={"/login"} className="font-medium">
              اینجا کلیک کنید
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
