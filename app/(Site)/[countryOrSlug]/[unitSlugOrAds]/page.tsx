import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import queryString from 'query-string';
import { PathGeneratorType } from '../country/page';
import UnitList from './unitList';
import fetchCountry from '@/modules/fetchCountry';
import pathGenerator from './_pathGenerator';
import AdsPage from './ads/ads';



type generateMetadata = { params: { countryOrSlug: string; unitSlugOrAds: string } };
export const generateMetadata = async ({
    params: { countryOrSlug, unitSlugOrAds },
}: generateMetadata): Promise<Metadata> => {
    let pathInfo: PathGeneratorType;

    try {
        pathInfo = await pathGenerator(countryOrSlug, unitSlugOrAds);
    } catch (e: any) {
        throw Error(e);
    }

    const currentCountry = (await fetchCountry({ code: countryOrSlug, revalidate: 200 }))?.[0]
    return {
        title: `لیست ${pathInfo?.props?.unit?.name} فارسی زبان در ${countryOrSlug && currentCountry && currentCountry.name
            } | کوچا`,
        description: `به جامعه مجازی ایرانیان مهاجر مقیم ${countryOrSlug && currentCountry && currentCountry.name
            } خوش آمدید. در این صفحه لیست کاملی از ${pathInfo?.props?.unit?.name
            } فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
        alternates: {
            canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${pathInfo?.props?.unit?.slug}`,
        },
    };
};

type ParsedSearchParams = {
    page?: number | number[];
    category?: number | number[];
    city?: any;
    search: string;
};

export default async function UnitPage({
    params: { countryOrSlug, unitSlugOrAds },
    searchParams,
}: {
    params: { countryOrSlug: string; unitSlugOrAds: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    let parsedSearchParams: ParsedSearchParams;
    let pathInfo: PathGeneratorType;

    parsedSearchParams = queryString.parse(
        queryString.stringify(searchParams ?? {}),
        { arrayFormat: 'comma', parseNumbers: true }
    ) as ParsedSearchParams;
    //get filters from query
    const { page: pageNumber, category, city, search } = parsedSearchParams;

    try {
        pathInfo = await pathGenerator(countryOrSlug, unitSlugOrAds);
    } catch (e: any) {
        throw Error(e);
    }

    if (pathInfo.type == 'ads') {
        return (
            <AdsPage/>
        );
    }
    
    if (pathInfo.type == 'unit') {
        return (
            <UnitList
                {...pathInfo.props}
                city={city}
                category={category}
                pageNumber={pageNumber}
                search={search}
            />
        );
    } else {
        notFound();
    }
}
