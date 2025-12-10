import { TermsPage } from "@/components/static/TermsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قوانین و مقررات استفاده از سایت",
  description:
    "در این صفحه آخرین نسخه قوانین و مقررات استفاده از سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
  alternates: {
    canonical: `/terms`,
  },
};

export default function Page() {
  return <TermsPage title={"قوانین و مقررات"} />;
}
