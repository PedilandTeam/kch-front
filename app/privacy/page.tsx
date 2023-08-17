import PageHead from "./page-head";
import TermsText from "./text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | حریم خصوصی کاربران سایت",
  description:
    "به کوچا، جامعه مجازی ایرانیان مهاجر مقیم همه جا خوش آمدید. هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری تامین کنید. در این صفحه آخرین نسخه از سیاست های حفظ حریم شخصی کاربران سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
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
