import type { Metadata } from "next";

import { AboutPage } from "@components";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "به جامعه ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
  alternates: {
    canonical: `/about`,
  },
};

export default function Page() {
  return <AboutPage title={metadata.title as string} />;
}
