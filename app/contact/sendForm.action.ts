'use server';

import { verifyCaptchaAction } from './verifyCaptcha.action';

type sendFormAction = {
  name: string;
  country: string;
  city: string;
  email: string;
  subject: string;
  message: string;
};
export default async function sendFormAction(
  { name, country, city, email, subject, message }: sendFormAction,
  token: string | null
) {
  const verified = await verifyCaptchaAction(token).catch(() => false);

  if (!verified) {
    throw new Error('کپچا مورد تایید نیست');
  }

  const emailVerified =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    );

  if (!emailVerified) {
    throw new Error('ایمیل مورد تایید نیست');
  }

  await fetch(process.env.NOTIFER_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: process.env.NOTIFER_KEY,
      message: `
            یک پیام از طریق ارتباط با ما 📬
            موضوع: ${subject}
            نام: ${name}
            کشور: ${country} / ${city}
            ایمیل: ${email}
            پیام: ${message}
            `,
    }),
  })
    .then(async (res) => {
      const response = await res.json();
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((e) => {
      console.log(e);
      throw new Error('Internall Server Error');
    });
}
