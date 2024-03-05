import fetchCountry from "@/modules/fetchCountry";
import fetchUnits from "@/modules/fetchUnit";
import { PathGeneratorType } from "../country/page";


const INVALID_PATH = {
    type: null
}



/**
 * Generates a path based on the country or slug and the unit slug or ads.
 *
 * @param {string} countryOrSlug - the country code or slug
 * @param {string} unitSlugOrAds - the unit slug or 'ads'
 * @return {Promise<PathGeneratorType>} the generated path
 */
const pathGenerator = async (
    countryOrSlug: string,
    unitSlugOrAds: string
): Promise<PathGeneratorType> => {

    const currentCountry = (await fetchCountry({ code: countryOrSlug, revalidate: 200 }))?.[0]
    const isAdsPage = unitSlugOrAds === 'ads'

    if (!currentCountry) {
        return INVALID_PATH;
    }

    if (isAdsPage) {
        return {
            type: 'ads',
        };   
    }

    const currentUnit = (await fetchUnits({ slug: unitSlugOrAds, revalidate: 2000 }))?.[0]
    if (!currentUnit) {
        return INVALID_PATH
    }
    
    return {
        type: 'unit',
        props: {
            unit: currentUnit,
            country: currentCountry,
        },
    };
};

export default pathGenerator