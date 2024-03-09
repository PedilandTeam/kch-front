import { CountryNamespace } from '@/types/country';
import { CategoryNamespace } from '@/types/category';
import Pagination from '../../pagination/pagination';
import { AdNamespace } from '@/types/ad';
import fetchAds from '@/modules/fetchAds';
import { ApiErrorResponse } from '@/modules/fetch';
import { CityNamespace } from '@/types/city';
import CardListItem from './carsListItem';
import { AdCategoryNamepace } from '@/types/adCategory';

type CardsListType = {
    country: CountryNamespace.GET;
    pageNumber?: number;
    category: AdCategoryNamepace.IAdCategory
    search?: string;
    city: number[]
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = async ({
    country,
    pageNumber,
    category,
    search,
    city,
}: CardsListType) => {
    let ads: AdNamespace.GET | undefined
    let isNotFound = false;
    try {
        ads = await fetchAds({
            page: pageNumber ? pageNumber : 1,
            categorySlug: category.slug,
            ...search && {search},
            countryCode: country.code,
            ...city && { cityIds: city },
            revalidate: 200,
        });
        
    }
    catch(e: ApiErrorResponse | any) {
        if (e?.statusCode != 404) {
            console.error(e)
        }
        isNotFound = true
    }
    
    if (ads && ads.items?.length == 0) {
        isNotFound = true;
    }

    if (isNotFound) {
        return (
            <div className='flex min-h-[60vh] w-full items-center justify-center'>
                <h3 className='text-2xl font-bold'>
                    با فیلترهای انتخابی چیزی یافت نشد :)
                </h3>
            </div>
        );
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='list-card min-h-[500px] w-full'>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-6'>
                    {ads?.items?.map(
                        (ad: AdNamespace.IAd, index: number) => {
                            return (
                                <CardListItem
                                    key={ad.id}
                                    variant='unit'
                                    ad={ad}
                                    country={country}
                                />
                            );
                        }
                    )}
                </div>
            </div>
            {ads?.meta?.totalPages! > 1 ? (
                <Pagination totalPages={ads!.meta.totalPages} />
            ) : null}
        </div>
    );
};
