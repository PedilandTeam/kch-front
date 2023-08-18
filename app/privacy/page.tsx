import PageHead from "./page-head";
import TermsText from "./text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | حریم خصوصی کاربران سایت",
  description:
    "در این صفحه آخرین نسخه از سیاست های حفظ حریم شخصی کاربران سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
};
const PrivacyPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />
      <TermsText />
    </div>
  );
};

export default PrivacyPage;
