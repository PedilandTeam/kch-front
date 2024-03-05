import { API_ROUTES } from '@/routes';
import { CountryNamespace } from '@/types/country';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryList from './businessList/categoryList';
import { PathGeneratorType } from '../../country/page';
import queryString from 'query-string';
import pathGenerator from './businessList/_pathGenerator';
import fetchCountry from '@/modules/fetchCountry';
import CityAds from './adsList/cityAds';
type ParsedSearchParams = {
    page?: number | number[];
    city?: any;
    search: string;
};



type generateMetadata = {
    params: { countryOrSlug: string; unitSlugOrAds: string; categoryOrCitySlug: string };
};
export const generateMetadata = async ({
    params: { countryOrSlug, unitSlugOrAds, categoryOrCitySlug },
}: generateMetadata): Promise<Metadata> => {
    let pathInfo: PathGeneratorType;

    try {
        pathInfo = await pathGenerator(countryOrSlug, unitSlugOrAds, categoryOrCitySlug);
    } catch (e: any) {
        throw Error(e);
    }

    const currentCountry = (await fetchCountry({ code: countryOrSlug, revalidate: 200 }))?.[0]

    return {
        title: `لیست ${pathInfo?.props?.category?.name} فارسی زبان در ${
            countryOrSlug && currentCountry && currentCountry.name
        } | کوچا`,
        description: `به جامعه مجازی ایرانیان مهاجر مقیم ${
            countryOrSlug && currentCountry && currentCountry.name
        } خوش آمدید. در این صفحه لیست کاملی از ${
            pathInfo?.props?.category?.name
        } فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
        alternates: {
            canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${unitSlugOrAds}/${pathInfo?.props?.category?.slug}`,
        },
    };
};

export default async function CategoryPage({
    params: { countryOrSlug, unitSlugOrAds, categoryOrCitySlug },
    searchParams,
}: {
    params: { countryOrSlug: string; unitSlugOrAds: string; categoryOrCitySlug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    let parsedSearchParams: ParsedSearchParams;
    let pathInfo: PathGeneratorType;

    parsedSearchParams = queryString.parse(
        queryString.stringify(searchParams ?? {}),
        { arrayFormat: 'comma', parseNumbers: true }
    ) as ParsedSearchParams;
    const { page: pageNumber, city, search } = parsedSearchParams;

    try {
        pathInfo = await pathGenerator(countryOrSlug, unitSlugOrAds, categoryOrCitySlug);
    } catch (e: any) {
        throw Error(e);
    }

    if (pathInfo.type == 'ads') {
        return <CityAds city={pathInfo.props.city} />
    }

    if (pathInfo.type == 'category') {
        return (
            <CategoryList
                {...pathInfo.props}
                pageNumber={pageNumber}
                city={city}
                search={search}
            />
        );
    }


    notFound()
}
