import PageHead from "./page-head";
// import TermsText from "@/text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | حریم خصوصی کاربران سایت",
  description:
    "در این صفحه آخرین نسخه از سیاست های حفظ حریم شخصی کاربران سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
  alternates: {
    canonical: `/privacy`,
  },
};
const PrivacyPage = () => {
  return (
    <div className="page-wrap static">
      <PageHead />
      {/* <TermsText /> */}
    </div>
  );
};

export default PrivacyPage;
