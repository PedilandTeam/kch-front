import { API_ROUTES } from '@/routes';
import { CountryNamespace } from '@/types/country';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryList from './businessList/categoryList';
import { PathGeneratorType } from '../../country/page';
import queryString from 'query-string';
import pathGenerator from './_pathGenerator';
import fetchCountry from '@/modules/fetchCountry';
import AdsList from './adsList/adsList';
type ParsedSearchParams = {
    page?: number | number[];
    city?: any;
    search: string;
};

type generateMetadata = {
    params: {
        countryOrSlug: string;
        unitSlugOrAds: string;
        categoryOrAdCategorySlug: string;
    };
};
/**
 * Generate metadata based on the provided parameters.
 * 
 *
 * @param {generateMetadata} params - Object containing country, unit, and category information
 * @return {Promise<Metadata>} A promise that resolves to the generated metadata
 */
export const generateMetadata = async ({
    params: { countryOrSlug, unitSlugOrAds, categoryOrAdCategorySlug },
}: generateMetadata): Promise<Metadata> => {
    let pathInfo: PathGeneratorType;

    try {


        // Call path generator with the country, unit, and category slug
        // to get information about the path.
        pathInfo = await pathGenerator(
            countryOrSlug,
            unitSlugOrAds,
            categoryOrAdCategorySlug
        );
    } catch (e: any) {
        throw Error(e);
    }

    const currentCountry = (
        await fetchCountry({ code: countryOrSlug, revalidate: 200 })
    )?.[0];

    return {
        title: `لیست ${pathInfo?.props?.category?.title} فارسی زبان در ${
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
    params: { countryOrSlug, unitSlugOrAds, categoryOrAdCategorySlug },
    searchParams,
}: {
    params: {
        countryOrSlug: string;
        unitSlugOrAds: string;
        categoryOrAdCategorySlug: string;
    };
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
        pathInfo = await pathGenerator(
            countryOrSlug,
            unitSlugOrAds,
            categoryOrAdCategorySlug
        );
    } catch (e: any) {
        throw Error(e);
    }

    if (pathInfo.type == 'ads') {
        return (
            <AdsList
                {...pathInfo.props}
                pageNumber={pageNumber}
                search={search}
                city={city}
            />
        );
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

    notFound();
}
