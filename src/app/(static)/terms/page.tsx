import type { Metadata } from "next";

import { TermsPage } from "@/components/ui";

export const metadata: Metadata = {
  title: "قوانین و مقررات استفاده از سایت",
  description:
    "در این صفحه آخرین نسخه قوانین و مقررات استفاده از سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
  alternates: {
    canonical: `/terms`,
  },
};

export default function Page() {
  return <TermsPage title={metadata.title as string} />;
}
