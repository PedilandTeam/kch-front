"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const ApplyForm = () => {
  const [sent, setSent] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");
  const recaptchaTokenHandler = (token: string) => {
    setRecaptchaToken(token);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      city: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      country: Yup.string().required(),
      city: Yup.string().required(),
      email: Yup.string().email().required(),
      subject: Yup.string().required(),
      message: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      await sendFormAction(values, recaptchaToken)
        .then((res) => {
          toast.success(
            "پیام شما دریافت شد و بزودی با شما ارتباط خواهیم گرفت",
            {
              duration: 4000,
            }
          );
          setSent(true);
        })
        .catch((e) => {
          toast.error("کپچا مورد تایید نیست");
        });
    },
    validateOnMount: false,
    validateOnBlur: false,
  });

  if (sent) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[300px] gap-y-6 text-xl">
        <p className="text-green-600 font-semibold text-3xl">
          ممنون! پیام‌تون رو دریافت کردیم.
        </p>
        <p>بزودی همکاران پشتیبانی باهاتون در ارتباط خواهند بود.</p>
      </div>
    );
  }
  return (
    <div className="sm:w-3/5 mx-auto">
      <h3 className="text-secondary font-semibold mb-6 text-xl text-center">
        فـرم ثـبـت درخـواسـت فـرصـت شـغـلـی
      </h3>
      <form>
        <div className="row grid sm:grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* نام کامل"
              className={`input ${
                formik.errors.name && "input-error"
              } input-bordered focus:input-secondary w-full`}
              name="name"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* تاریخ تولد"
              className={`input ${
                formik.errors.country && "input-error"
              } input-bordered focus:input-secondary w-full`}
              name="country"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* شهر محل سکونت"
              className={`input ${
                formik.errors.city && "input-error"
              } input-bordered focus:input-secondary w-full`}
              name="city"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="email"
              placeholder="* ایمیل"
              className={`input ${
                formik.errors.email && "input-error"
              } input-bordered focus:input-secondary w-full`}
              name="email"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="text"
              placeholder="* شماره واتس‌آپ"
              className={`input input-bordered focus:input-secondary w-full`}
              name="whatsapp"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <select className="select select-bordered w-full pr-5 text-base">
              <option selected>موقعیت مورد نظر</option>
              <option>کارشناس موفقیت مشتری - کارآموزی</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">آپلود فایل رزومه</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
              />
              <label className="label">
                <span className="label-text text-gray-500">
                  لطفا فقط با فرمت PDF و JPG فایل‌هاتون رو برامون بفرستید.
                </span>
              </label>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-6">
            <textarea
              className="textarea input-bordered focus:textarea-secondary text-base w-full"
              placeholder="* متن انگیزه نامه"
              rows={8}
              name="message"
              onChange={formik.handleChange}
            ></textarea>
          </div>

          <div className="col-span-6">
            <div className="flex justify-center flex-col items-center">
              <ReCAPTCHA
                className="mb-4"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token)}
              />
              <button
                type="submit"
                className="btn btn-outline btn-secondary w-full sm:w-1/2 text-base"
              >
                ثـبـت فـرم
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ApplyForm;
