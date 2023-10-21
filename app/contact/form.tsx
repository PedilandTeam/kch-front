'use client'

import { useFormik } from "formik";
import * as Yup from 'yup'
import sendFormAction from "./sendForm.action";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";


const ContactForm = () => {

  const [sent, setSent] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>('')
  const recaptchaTokenHandler = (token: string) => {
    setRecaptchaToken(token)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      city: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      country: Yup.string().required(),
      city: Yup.string().required(),
      email: Yup.string().email().required(),
      subject: Yup.string().required(),
      message: Yup.string().required()
    }),
    onSubmit: async(values) => {
      await sendFormAction(values, recaptchaToken)
      .then(res => {
        toast.success('پیام شما دریافت شد و بزودی با شما ارتباط خواهیم گرفت', {
          duration: 4000,
        })
        setSent(true)
      })
      .catch(e => {
        toast.error('کپچا مورد تایید نیست')
      })
    },
    validateOnMount: false,
    validateOnBlur: false,
  })

  if(sent){
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[300px] gap-y-6 text-xl">
        <p className="text-green-500 font-bold text-5xl">پیغام شما ارسال شد</p>
        <p>ممنون از ارتباط شما. بزودی به شما پاسخ خواهیم داد</p>
      </div>
    )
  }
  return (
    <div className="max-w-[760px] w-full mx-auto my-20 sm:mb-28 px-3 sm:px-0">
      <h3 className="text-center font-semibold text-[18px] mb-5 text-pink-900">
        همچنین می‌تونید از طریق این فرم به راحتی با ما در تماس باشید.
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row grid sm:grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* نام کامل"
              className={`input ${formik.errors.name && 'input-error'} input-bordered focus:input-secondary w-full`}
              name="name"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* کشور"
              className={`input ${formik.errors.country && 'input-error'} input-bordered focus:input-secondary w-full`}
              name="country"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* شهر"
              className={`input ${formik.errors.city && 'input-error'} input-bordered focus:input-secondary w-full`}
              name="city"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="email"
              placeholder="* ایمیل"
              className={`input ${formik.errors.email && 'input-error'} input-bordered focus:input-secondary w-full`}
              name="email"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="text"
              placeholder="* موضوع"
              className={`input ${formik.errors.subject && 'input-error'} input-bordered focus:input-secondary w-full`}
              name="subject"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <textarea
              className="textarea input-bordered focus:textarea-secondary w-full"
              placeholder="متن پیام"
              rows={8}
              name="message"
              onChange={formik.handleChange}
            ></textarea>
          </div>


          <div className=" flex justify-center items-center flex-col col-span-6 sm:col-span-2 sm:col-start-3">
            <ReCAPTCHA className="mb-4" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={(token) => setRecaptchaToken(token)} />
            <button type="submit" className="btn btn-outline btn-primary w-full">
              ارسال پیام
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
