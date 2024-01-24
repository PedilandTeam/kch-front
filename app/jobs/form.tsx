"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import sendFormAction from "./sendForm.action";


interface IFormValues {
  name: string;
  birthday: string;
  city: string;
  email: string;
  whatsapp: string;
  file: File | null;
  message: string
}

const ApplyForm = () => {
  const [sent, setSent] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");
  const recaptchaTokenHandler = (token: string) => {
    setRecaptchaToken(token);
  };
  const [loading, setLoading] = useState<boolean>(false)

  const formik = useFormik<IFormValues>({
    initialValues: {
      name: "",
      birthday: "",
      city: "",
      email: "",
      whatsapp: "",
      file: null,
      message: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      birthday: Yup.string().required(),
      city: Yup.string().required(),
      email: Yup.string().email().required(),
      whatsapp: Yup.string().required(),
      file: Yup.mixed().required('رزومه الزامی است'),
      message: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', values.file!)
      await sendFormAction(values, formData, recaptchaToken)
        .then((res) => {
          toast.success(
            "پیام شما دریافت شد و بزودی با شما ارتباط خواهیم گرفت",
            {
              duration: 4000,
            }
          );
          setSent(true);
        })
        .catch((e: any) => {
          toast.error(e?.message);
        })
        .finally(() => {
          setLoading(false)
        })
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
      <form onSubmit={formik.handleSubmit}>
        <div className="row grid sm:grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* نام کامل"
              className={`input ${formik.errors.name && "input-error"
                } input-bordered focus:input-secondary w-full`}
              name="name"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* تاریخ تولد"
              className={`input ${formik.errors.birthday && "input-error"
                } input-bordered focus:input-secondary w-full`}
              name="birthday"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* شهر محل سکونت"
              className={`input ${formik.errors.city && "input-error"
                } input-bordered focus:input-secondary w-full`}
              name="city"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="email"
              placeholder="* ایمیل"
              className={`input ${formik.errors.email && "input-error"
                } input-bordered focus:input-secondary w-full`}
              name="email"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="text"
              placeholder="* شماره واتس‌آپ"
              className={`input ${formik.errors.email && "input-error"
                } input-bordered focus:input-secondary w-full`}
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
                accept="application/pdf, image/jpeg"
                name="file"
                className={`file-input ${formik.errors.email && "input-error"
                  } file-input-bordered focus:file-input-secondary w-full`}
                onChange={(event) => {
                  formik.setFieldValue('file', event.currentTarget.files?.[0]);
                }}
              />
              <label className="label">
                <span className="label-text text-gray-500">
                  لطفا فقط با فرمت PDF و JPG فایل‌هاتون رو برامون بفرستید.
                  <br />
                  حجم فایل باید کمتر از ۵ مگابایت باشد
                </span>
              </label>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-6">
            <textarea
              className={` ${
                formik.errors.message && " textarea-error"
              } textarea input-bordered focus:textarea-secondary text-base w-full`}
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
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2!}
                onChange={(token) => setRecaptchaToken(token)}
              />
              <button
                type="submit"
                className="btn btn-outline btn-secondary w-full sm:w-1/2 text-base"
              >
                {loading ? '...درحال ارسال' : 'ارسال فرم'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ApplyForm;
