import fetchCountry from "@/modules/fetchCountry";
import { PathGeneratorType } from "../../country/page";
import fetchUnits from "@/modules/fetchUnit";
import fetchCategories from "@/modules/fetchCategories";
import fetchCities from "@/modules/fetchCities";

const INVALID_PATH = {
    type: null
}


/**
 *
 * @param countryOrSlug get country with [countryOrSlug]
 * @param unitSlugOrAds get unit of category to check is entered category part of current unit
 * @param categoryOrCitySlug get targeted category by Slug
 * @returns
 */
const pathGenerator = async (
    countryOrSlug: string,
    unitSlugOrAds: string,
    categoryOrCitySlug: string
): Promise<PathGeneratorType> => {


    const currentCountry = (await fetchCountry({ code: countryOrSlug, revalidate: 200 }))?.[0]
    if (!currentCountry) {
        return INVALID_PATH
    }
    
    const currentCity = (await fetchCities({ slug: categoryOrCitySlug, revalidate: 200, countryCode: currentCountry.code }))?.items?.[0]
    const isAdsPage = unitSlugOrAds == 'ads'
    if (isAdsPage) {
        if (!currentCity) {
            return INVALID_PATH
        }
        return {
            type: 'ads',
            props: {
                city: currentCity,
                country: currentCountry,
            }
        }
    }
    
    
    const currentUnit = (await fetchUnits({ slug: unitSlugOrAds, revalidate: 2000 }))?.[0]
    const currentCategory = (await fetchCategories({slug: categoryOrCitySlug, revalidate: 200 }))?.items?.[0]
    if (currentCategory?.unit?.id != currentUnit?.id) {
        return INVALID_PATH
    }

    return {
        type: 'category',
        props: {
            category: currentCategory,
            country: currentCountry,
            unit: currentUnit,
        },
    };
    // return <CategoryList category={currentCategory} country={currentCountry} />
};

export default pathGenerator