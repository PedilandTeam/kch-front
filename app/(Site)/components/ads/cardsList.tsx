import { CountryNamespace } from '@/types/country';
import { AdNamespace } from '@/types/ad';
import fetchAds from '@/modules/fetchAds';
import { ApiErrorResponse } from '@/modules/fetch';
import CardListItem from './cardListItem';
import { AdCategoryNamepace } from '@/types/adCategory';
import CardsListClient from './cardsList.client';

type CardsListType = {
    country: CountryNamespace.GET;
    pageNumber?: number;
    category?: AdCategoryNamepace.IAdCategory
    search?: string;
    city?: number[]
};

export const CardsList = async ({
    country,
    pageNumber = 1,
    category,
    search,
    city,
}: CardsListType) => {
    let ads: AdNamespace.GET | undefined
    let isNotFound = false;

    try {
        ads = await fetchAds({
            page: pageNumber,
            ...search && {search},
            ...category?.slug && {categorySlug: category.slug},
            countryCode: country.code,
            cityIds: city,
            revalidate: 200,
        }) as AdNamespace.GET;
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
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className='list-card min-h-[500px] w-full'>
                    <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-6'>
                        {ads?.items?.map(
                            (ad: AdNamespace.IAd, index: number) => {
                                return (
                                    <CardListItem
                                        key={ad.id}
                                        ad={ad}
                                        country={country}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
            {ads?.meta?.totalPages! > 1 ? (
                    // <Pagination totalPages={ads!.meta.totalPages} />
                    <CardsListClient pageNumber={pageNumber} country={country} limit={30} />
            ) : null}
        </>
    );
};
