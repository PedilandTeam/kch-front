import { AdsclubPage } from "@/components/static/AdsclubPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "!Ads Club",
  description:
    "به جامعه ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.",
  alternates: {
    canonical: `/adsclub`,
  },
};

export default function Page() {
  return <AdsclubPage title={metadata.title as string} />;
}
