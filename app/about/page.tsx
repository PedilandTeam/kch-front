import PageHead from "./page-head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | درباره ما",
  description:
    "به جامعه ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
};

const AboutPage = () => {
  return (
    <div className="page-wrap">
      <PageHead />
    </div>
  );
};

export default AboutPage;
