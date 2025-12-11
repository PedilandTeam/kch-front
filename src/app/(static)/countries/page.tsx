import type { Metadata } from "next";

import { CountriesPage } from "@/components/static/CountriesPage";

export const metadata: Metadata = {
  title: "لیست کشورهای فعال در پلتفرم کـوچـا",
  description:
    "در این صفحه تمام کشورهایی که در پلتفرم کـوچـا فعال است و برای ایرانیان مهاجر مقیم آن خدمات ارائه می‌شود لیست شده است و شما می‌توانید محل اقامت خود را انتخاب نمایید.",
  alternates: {
    canonical: `/countries`,
  },
};

export default function Page() {
  return <CountriesPage title={"لیست کشورها"} />;
}
