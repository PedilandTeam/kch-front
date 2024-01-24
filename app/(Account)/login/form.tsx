"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { REGEX } from "@/utils/regex";
import toast from "react-hot-toast";
import useLogin from "./useLogin";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import Input from "@/components/daisy/input";
import Button from "@/components/daisy/button";

const LoginForm = () => {
    const { login, loading } = useLogin();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            usernameOrEmail: "",
            password: "",
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
                    router.replace("/home");
                    toast.success(json.message);
                })
                .catch((e) => {
                    toast.error("خطایی رخ داد");
                });
        },
    });

    return (
        <div className="h-full flex flex-wrap items-baseline sm:items-center bg-simple-1 sm:relative">
            {/* <HeaderSimple /> */}

            <div className="w-full sm:w-1/4 mx-3 sm:mx-auto bg-white p-6 sm:p-8 rounded-xl shadow border border-t-[4px] border-t-yellow-500 relative">
                <div className="absolute left-10 -top-[52px]">
                    <Image
                        src={"/images/bird-symbol.png"}
                        width={50}
                        height={50}
                        alt="Koochaa Bird Symbol"
                    />
                </div>
                <h1 className="font-semibold mb-4 text-lg text-primary">
                    ورود به حساب کاربری
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-3">
                        <Input
                            bordered
                            type="text"
                            name="usernameOrEmail"
                            onChange={formik.handleChange}
                            placeholder="نام کاربری یا ایمیل"
                            endContent={<UserIcon className="h-7 w-7 text-gray-400" />}
                        />
                        <Input
                            bordered
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.password}
                            errorMessage={
                                !!formik.errors.password &&
                                "رمز باید حداقل ۸ کارکتر و شامل حداقل یک حرف بزرگ و یک عدد باشد"
                            }
                            placeholder="رمز عبور"
                            endContent={<LockClosedIcon className="h-7 w-7 text-gray-400" />}
                        />
                    </div>
                    <div className="mt-3">
                        <p className="text-[15px] text-blue-800">
                            <Link href={"/resetPassword"}>رمز عبورم را فراموش کردم.</Link>
                        </p>
                        <Button
                            type="submit"
                            className="my-6 w-full btn-primary text-white"
                            color="primary"
                            isLoading={loading}
                        >
                            ورود کاربر
                        </Button>
                        <p className="text-[15px]">
                            حساب کاربری ندارید؟{" "}
                            <Link href={"/register"} className="font-medium text-blue-800">
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
