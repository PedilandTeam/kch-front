import type { Metadata } from "next";

import { AboutPage } from "@/components/static/AboutPage";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "به پلتفرم رشد و بازاریابی ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می‌آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
  alternates: {
    canonical: `/about`,
  },
};

export default function Page() {
  return <AboutPage title={metadata.title as string} />;
}
