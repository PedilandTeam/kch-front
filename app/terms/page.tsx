import PageHead from "./page-head";
import TermsText from "./text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | قوانین و مقررات استفاده از سایت",
  description:
    "در این صفحه آخرین نسخه قوانین و مقررات استفاده از سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
  alternates: {
    canonical: `/terms`,
  },
};
const TermsPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />
      <TermsText />
    </div>
  );
};

export default TermsPage;
