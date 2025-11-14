import type { Metadata } from "next";

import { ContactPage } from "@/components/ui";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "به کوچا، جامعه مجازی ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه می توانید راه های ارتباطی و لینک صفحات رسمی کوچا در رسانه های اجتماعی را پیدا کنید.",
  alternates: {
    canonical: `/contact`,
  },
};

export default function Page() {
  return <ContactPage title={metadata.title as string} />;
}
