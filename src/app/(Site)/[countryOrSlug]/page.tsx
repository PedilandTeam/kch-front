// app/(Site)/[countryOrSlug]/page.tsx

import { notFound } from "next/navigation";
import { getRouteData } from "./data";
import Country from "./country/country";
import PageItem from "./item/item";
import { metadata as defaultMetadata } from "../page";

type Params = { params: Promise<{ countryOrSlug: string }> };

export async function generateMetadata({ params }: Params) {
  const { countryOrSlug } = await params;
  const data = await getRouteData(countryOrSlug);

  if (!data) {
    return {
      ...defaultMetadata,
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description: "متاسفانه چنین صفحه‌ای وجود نداره و یا آدرسش تغییر کرده.",
    };
  }

  if (data.type === "country") {
    return {
      ...defaultMetadata,
      title: `کوچا | جامعه ایرانیان مهاجر مقیم ${data.currentCountry.name}`,
      description: `به جامعه مجازی ایرانیان مهاجر مقیم ${data.currentCountry.name} خوش آمدید...`,
      // با metadataBase (قدم ۳) می‌تونیم نسبی بدیم:
      alternates: { canonical: `/${data.currentCountry.code}` },
    };
  }

  return {
    ...defaultMetadata,
    title: `${data.pageData.title} - ${data.pageData.city?.name}، ${data.pageData.country?.name} | کوچا`,
    description: `این صفحه پروفایل اختصاصی ${data.pageData.title} در پلتفرم کوچاست...`,
    alternates: { canonical: `/${data.pageData.slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { countryOrSlug } = await params;
  const data = await getRouteData(countryOrSlug);

  if (!data) return notFound();

  if (data.type === "country") {
    if (!data.currentCountry.availability) return notFound();

    return (
      <Country
        currentCountry={data.currentCountry}
        categories={data.categories}
      />
    );
  }

  if (!data.pageData) return notFound();

  return <PageItem pageData={data.pageData} />;
}
