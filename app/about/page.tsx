import PageHead from "./page-head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | درباره ما",
  description:
    "به کوچا، جامعه مجازی ایرانیان مهاجر مقیم همه جا خوش آمدید. هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری تامین کنید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
};

const AboutPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />
    </div>
  );
};

export default AboutPage;
