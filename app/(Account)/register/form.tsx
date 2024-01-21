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
// import HeaderSimple from "../layout/header-sm";

export type FormikValues = {
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
      name,
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
          name,
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
            <input
              name="name"
              autoComplete="organization-title"
              onChange={formik.handleChange}
              className="input-bordered input col-span-4 sm:col-span-2"
              type="text"
              placeholder="نام"
            />
            <input
              name="lastname"
              autoComplete="organization-title"
              onChange={formik.handleChange}
              className="input-bordered input col-span-4 sm:col-span-2"
              type="text"
              placeholder="نام خانوادگی"
            />
            <input
              name="username"
              autoComplete="new-username"
              onChange={formik.handleChange}
              className="input-bordered input col-span-4 sm:col-span-2"
              placeholder="نام کاربری"
            />
            <input
              name="email"
              autoComplete="new-email"
              onChange={formik.handleChange}
              className="input-bordered input col-span-4 sm:col-span-2"
              type="email"
              placeholder="ایمیل"
            />
            <input
              name="password"
              autoComplete="new-password"
              onChange={formik.handleChange}
              type="password"
              className="input-bordered input col-span-4"
              placeholder="رمز عبور"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-6 w-full"
            color="primary"
          >
            ثبت نام کاربر {loading ? <div className="loading loading-spinner loading-ms"></div> : ''}
          </button>
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
 