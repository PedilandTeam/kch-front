import { Metadata } from "next";

import { AboutPageHead } from "@/components/site/AboutPageHead";
import { AboutTextSec } from "@/components/site/AboutTextSec";
import { StaticPageProvider } from "@/_providers/StaticPageProvider";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "به جامعه ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
  alternates: {
    canonical: `/about`,
  },
};

const AboutPage = () => {
  return (
    <StaticPageProvider title={metadata.title as string}>
      <AboutPageHead />
      <AboutTextSec />
    </StaticPageProvider>
  );
};

export default AboutPage;
