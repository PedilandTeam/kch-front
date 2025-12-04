import { BusinessCenterPage } from "@/components/static/BusinessCenterPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بیزینس سنتر",
  description:
    "به جامعه ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
  alternates: {
    canonical: `/business-center`,
  },
};

export default function Page() {
  return <BusinessCenterPage title={metadata.title as string} />;
}
