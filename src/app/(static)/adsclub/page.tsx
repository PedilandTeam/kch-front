import { AdsclubPage } from "@/components/static/AdsclubPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ادز کلاب - سرویس ارسال هدفمند آگهی ویژه ایرانیان مهاجر",
  description:
    "ادز کلاب سرویس ارسال هدفمند آگهی ویژه ایرانیان مهاجر است که آگهی‌های معتبر را بدون اسپم و مزاحمت، براساس کشور، شهر و نیازتان ارسال می‌کند؛ با حفظ کامل حریم خصوصی.",
  alternates: {
    canonical: `/adsclub`,
  },
};

export default function Page() {
  return <AdsclubPage title={"سرویس ادز کلاب"} />;
}
