import fetchCountry from '@/modules/fetchCountry';
import fetchUnits from '@/modules/fetchUnit';
import fetchCategories from '@/modules/fetchCategories';
import fetchAdCategories from '@/modules/fetchAdCategories';
import { PathGeneratorType } from '../../country/page';
import fetchAds from '@/modules/fetchAds';
import { AdNamespace } from '@/types/ad';

const INVALID_PATH = {
    type: null,
};

/**
 *
 * @param countryOrSlug get country with [countryOrSlug]
 * @param unitSlugOrAds get unit of category to check is entered category part of current unit
 * @param categoryOrAdCategorySlugOrAdId get targeted category by Slug
 * @returns
 */
const pathGenerator = async (
    countryOrSlug: string,
    unitSlugOrAds: string,
    categoryOrAdCategorySlugOrAdId: string
): Promise<PathGeneratorType> => {
    const currentCountry = (await fetchCountry({ code: countryOrSlug }))?.[0];
    if (!currentCountry) {
        return INVALID_PATH;
    }
    

    const currentAdCategory = (
        await fetchAdCategories({ slug: categoryOrAdCategorySlugOrAdId })
    )[0];
    const isAdsPage = unitSlugOrAds == 'ads';
    if (isAdsPage) {
        if (!currentAdCategory) {
            const currentAd = (await fetchAds(
                { id: categoryOrAdCategorySlugOrAdId },
                200
            )) as AdNamespace.IAd;
                
            if (!currentAd) return INVALID_PATH;
            if (currentAd.country.id != currentCountry.id) {
                return INVALID_PATH;
            }            
    
            return {
                type: 'ad',
                props: {
                    ad: currentAd,
                },
            };
        }
        return {
            type: 'ads',
            props: {
                category: currentAdCategory,
                country: currentCountry,
            },
        };
    }

    const currentUnit = (
        await fetchUnits({ slug: unitSlugOrAds, revalidate: 2000 })
    )?.[0];
    const currentCategory = (
        await fetchCategories({
            slug: categoryOrAdCategorySlugOrAdId,
            revalidate: 200,
        })
    )?.items?.[0];

    console.log(currentCategory);
    
    if (currentCategory) {
        if (currentCategory?.unit?.id != currentUnit?.id) {
            
            return INVALID_PATH;
        }
        return {
            type: 'category',
            props: {
                category: currentCategory,
                country: currentCountry,
                unit: currentUnit,
            },
        };
    }

    return INVALID_PATH;
};

export default pathGenerator;
