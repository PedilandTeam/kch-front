"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEX } from "@/utils/regex";
import toast from "react-hot-toast";
import useLogin from "./useLogin";
import { useEffect } from "react";
import { mutate } from "swr";
import { Button, Input } from "@/components";

// const LoginForm = () => {
//   const { login } = useLogin();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const formik = useFormik({
//     initialValues: {
//       usernameOrEmail: "",
//       password: "",
//     },
//     validationSchema: Yup.object().shape({
//       usernameOrEmail: Yup.string().required(),
//       password: Yup.string().matches(REGEX.PASSWORD).required(),
//     }),
//     validateOnChange: false,
//     validateOnBlur: false,
//     validateOnMount: false,
//     onSubmit: async (values) => {
//       const { usernameOrEmail, password } = values;
//       await login(usernameOrEmail, password)
//         .then((response) => {
//           const { json, res } = response;
//           if (!res.ok) {
//             return toast.error(json.message);
//           }
//           mutate(process.env.NEXT_PUBLIC_CHECKAUTH_URL)
//             .then(() => {
//               router.push("/account");
//             })
//             .then(() => {
//               toast.success("ورود موفق");
//               router.replace("/account");
//             });
//         })
//         .catch((err) => {
//           console.error("Error in LoginForm onSubmit", err);
//           toast.error("خطایی رخ داد");
//         });
//     },
//   });

//   useEffect(() => {
//     if (searchParams.has("notAuthenticated")) {
//       toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
//     }
//   }, [searchParams]);

//   return (
//     <div className="bg-simple-1 mt-24 flex flex-wrap items-baseline sm:relative sm:items-center lg:mt-0 lg:h-[80vh]">
//       {/* <HeaderSimple /> */}

//       <div className="relative mx-3 w-full rounded-xl border border-t-[4px] border-t-yellow-500 bg-white p-6 shadow sm:mx-auto sm:w-2/4 sm:p-8 md:w-2/4 lg:w-4/12">
//         <div className="absolute -top-[52px] left-10">
//           <Image
//             src={"/images/bird-symbol.png"}
//             width={50}
//             height={50}
//             alt="Koochaa Bird Symbol"
//           />
//         </div>
//         <h1 className="text-primary mb-4 text-lg font-semibold">
//           ورود به حساب کاربری
//         </h1>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="grid gap-3">
//             <Input
//               type="text"
//               name="usernameOrEmail"
//               onChange={formik.handleChange}
//               placeholder="نام کاربری یا ایمیل"
//             />
//             <Input
//               type="password"
//               name="password"
//               onChange={formik.handleChange}
//               placeholder="رمز عبور"
//             />
//           </div>
//           <div className="mt-3">
//             <p className="text-[15px] text-blue-800">
//               <Link href={"/resetPassword"}>رمز عبورم را فراموش کردم.</Link>
//             </p>
//             <Button
//               type="submit"
//               className="btn-primary my-6 w-full text-white"
//               color="primary"
//             >
//               ورود کاربر
//             </Button>
//             <p className="text-[15px]">
//               حساب کاربری ندارید؟{" "}
//               <Link href={"/register"} className="font-medium text-blue-800">
//                 اینجا کلیک کنید
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
