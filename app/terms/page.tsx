import PageHead from "./page-head";
import TermsText from "./text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | قوانین و مقررات استفاده از سایت",
  description:
    "به کوچا، جامعه مجازی ایرانیان مهاجر مقیم همه جا خوش آمدید. هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری تامین کنید. در این صفحه آخرین نسخه قوانین و مقررات استفاده از سایت کوچا نوشته شده است. مطالعه این صفحه به تمامی کاربران و بازدیدکنندگان پیشنهاد می شود.",
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
