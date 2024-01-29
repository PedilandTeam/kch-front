'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import sendFormAction from './sendForm.action';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';

const ContactForm = () => {
    const [sent, setSent] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>('');
    const recaptchaTokenHandler = (token: string) => {
        setRecaptchaToken(token);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            country: '',
            city: '',
            email: '',
            subject: '',
            message: '',
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
                        'پیام شما دریافت شد و بزودی با شما ارتباط خواهیم گرفت',
                        {
                            duration: 4000,
                        }
                    );
                    setSent(true);
                })
                .catch((e) => {
                    toast.error('کپچا مورد تایید نیست');
                });
        },
        validateOnMount: false,
        validateOnBlur: false,
    });

    if (sent) {
        return (
            <div className='flex min-h-[300px] w-full flex-col items-center justify-center gap-y-6 text-xl'>
                <p className='text-3xl font-semibold text-green-600'>
                    ممنون! پیام‌تون رو دریافت کردیم.
                </p>
                <p>بزودی همکاران پشتیبانی باهاتون در ارتباط خواهند بود.</p>
            </div>
        );
    }
    return (
        <div className='mx-auto my-20 w-full max-w-[760px] px-3 sm:mb-28 sm:px-0'>
            <h3 className='mb-8 text-center text-[18px] font-semibold text-pink-900'>
                همچنین می‌تونید از طریق این فرم به راحتی با ما در تماس باشید.
            </h3>
            <form onSubmit={formik.handleSubmit}>
                <div className='row grid gap-3 sm:grid-cols-6'>
                    <div className='col-span-6 sm:col-span-2'>
                        <input
                            type='text'
                            placeholder='* نام کامل'
                            className={`input ${
                                formik.errors.name && 'input-error'
                            } input-bordered w-full focus:input-secondary`}
                            name='name'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='col-span-6 sm:col-span-2'>
                        <input
                            type='text'
                            placeholder='* کشور'
                            className={`input ${
                                formik.errors.country && 'input-error'
                            } input-bordered w-full focus:input-secondary`}
                            name='country'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='col-span-6 sm:col-span-2'>
                        <input
                            type='text'
                            placeholder='* شهر'
                            className={`input ${
                                formik.errors.city && 'input-error'
                            } input-bordered w-full focus:input-secondary`}
                            name='city'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='col-span-6 sm:col-span-2'>
                        <input
                            type='email'
                            placeholder='* ایمیل'
                            className={`input ${
                                formik.errors.email && 'input-error'
                            } input-bordered w-full focus:input-secondary`}
                            name='email'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='col-span-6 sm:col-span-2'>
                        <input
                            type='text'
                            placeholder='شماره واتس‌آپ'
                            className={`input input-bordered w-full focus:input-secondary`}
                            name='whatsapp'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='col-span-6 sm:col-span-2'>
                        <input
                            type='text'
                            placeholder='* موضوع'
                            className={`input ${
                                formik.errors.subject && 'input-error'
                            } input-bordered w-full focus:input-secondary`}
                            name='subject'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='col-span-6 sm:col-span-6'>
                        <textarea
                            className='textarea input-bordered w-full focus:textarea-secondary'
                            placeholder='متن پیام'
                            rows={8}
                            name='message'
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>

                    <div className=' col-span-6 flex flex-col items-center justify-center sm:col-span-2 sm:col-start-3'>
                        <ReCAPTCHA
                            className='mb-4'
                            sitekey={
                                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2!
                            }
                            onChange={(token) => setRecaptchaToken(token)}
                        />
                        <button
                            type='submit'
                            className='btn btn-outline btn-primary w-full'
                        >
                            ارسال پیام
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
