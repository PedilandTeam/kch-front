import { BusinessCenterPage } from "@/components/static/BusinessCenterPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بیزینس سنتر - راهکار جامعه کسب و کار ویژه ایرانیان مهاجر",
  description:
    "بیزینس سنتر کوچا خدمات حرفه‌ای و منصفانه برای رشد کسب‌وکار ایرانیان خارج از کشور ارائه می‌دهد تا بدون دغدغه روی توسعه و مشتریان خود تمرکز کنید.",
  alternates: {
    canonical: `/business-center`,
  },
};

export default function Page() {
  return <BusinessCenterPage title={"بیزینس سنتر"} />;
}
