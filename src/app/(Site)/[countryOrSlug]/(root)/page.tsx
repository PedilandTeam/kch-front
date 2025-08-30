import { notFound } from "next/navigation";
import { baseSiteMetadata } from "@/config/metadata";
import {CountryPage} from "@/components/index";
import { getRouteData } from "../data";
import PageItem from "../item/item";

type Params = { params: Promise<{ countryOrSlug: string }> };

export async function generateMetadata({ params }: Params) {
  const { countryOrSlug } = await params;
  const data = await getRouteData(countryOrSlug);

  if (!data) {
    return {
      ...baseSiteMetadata,
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description: "متاسفانه چنین صفحه‌ای وجود نداره و یا آدرسش تغییر کرده.",
    };
  }

  if (data.type === "country") {
    return {
      ...baseSiteMetadata,
      title: `کوچا | جامعه ایرانیان مهاجر مقیم ${data.currentCountry.name}`,
      description: `به جامعه مجازی ایرانیان مهاجر مقیم ${data.currentCountry.name} خوش آمدید...`,
      alternates: { canonical: `/${data.currentCountry.code}` },
    };
  }

  return {
    ...baseSiteMetadata,
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
      <CountryPage
        currentCountry={data.currentCountry}
        categories={data.categories}
      />
    );
  }

  if (!data.pageData) return notFound();

  return <PageItem pageData={data.pageData} />;
}
