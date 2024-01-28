'use server';

import { verifyCaptchaAction } from './verifyCaptcha.action';

type sendFormAction = {
  name: string;
  birthday: string;
  city: string;
  email: string;
  whatsapp: string;
  file: any | null;
  message: string;
};
export default async function sendFormAction(
  data: sendFormAction,
  fileFormData: FormData,
  token: string | null
) {
  if (!fileFormData.get('file')) {
    throw new Error('فایل الزامی است');
  }

  const file = fileFormData.get('file') as any;

  // Check file size (limit to 5 MB)
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
  if (file.size > maxSize) {
    throw new Error('حجم فایل باید کمتر از 5 مگابایت باشد');
  }

  // Check file format (accept only jpg and pdf)
  const allowedFormats = ['image/jpeg', 'application/pdf'];
  if (!allowedFormats.includes(file.type)) {
    throw new Error('فرمت فایل معتبر نیست. فقط فرمت‌های jpg و pdf مجاز هستند');
  }

  const verified = await verifyCaptchaAction(token).catch(() => false);

  if (!verified) {
    throw new Error('کپچا مورد تایید نیست');
  }

  const emailVerified =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      data.email as string
    );

  if (!emailVerified) {
    throw new Error('ایمیل مورد تایید نیست');
  }

  const message = `
    🖥️ درخواست کارآموزی:
    نام: ${data.name}
    تولد: ${data.birthday}
    شهر: ${data.city}
    ایمیل: ${data.email}
    واتساپ: ${data.whatsapp}
    انگیزه‌نامه: ${data.message}
    `;

  const CHAT_IDS = ['1294540534', '110923874'];
  try {
    for (const chatId of CHAT_IDS) {
      const response = await fetch(
        `${process.env.TEL_API_URL}/bot${process.env.TEL_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );
      if (!response.ok) {
        console.log(await response.json());

        console.log('not ok send text in jobs');
        throw new Error('خطا در ارتباط با سرور. دوباره تلاش کنید');
      }
    }
  } catch (e: any) {
    console.log('not ok send text in jobs', e);
    throw new Error('خطا در ارتباط با سرور. دوباره تلاش کنید');
  }

  try {
    for (const chatId of CHAT_IDS) {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('caption', data.name);
      formData.append('chat_id', chatId);
      const response = await fetch(
        `${process.env.TEL_API_URL}/bot${process.env.TEL_BOT_TOKEN}/sendDocument`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        console.log('not ok send doc in jobs', await response.json());
        throw new Error('خطا در ارتباط با سرور. دوباره تلاش کنید');
      }
    }
  } catch (e: any) {
    console.log('not ok send doc in jobs', e);
    throw new Error('خطا در ارتباط با سرور. دوباره تلاش کنید');
  }

  return true;
}
