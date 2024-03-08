import { CountryNamespace } from '@/types/country';
import { UnitType } from '@/types/unit';
import { CardsList } from './cardsList';
import { Suspense } from 'react';
import Loading from '../../_loading';
import SideBanner from '@/app/banners/side-banner';
import fetchAdCategories from '@/modules/fetchAdCategories';
import { AdNamespace } from '@/types/ad';
import { CityNamespace } from '@/types/city';
import { AdCategoryNamepace } from '@/types/adCategory';

type PagesListProps = {
    country: CountryNamespace.GET;
    pageNumber?: number;
    category: AdCategoryNamepace.IAdCategory;
    search?: string;
    city?: CityNamespace.city;
};


export default async function AdsList({
    country,
    pageNumber,
    city,
    category,
    search,
}: PagesListProps) {
    

    return (
        <div className='component page-list sm:mt-3'>
            <div className='container mx-auto max-w-[1144px]'>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-8 sm:gap-8'>
                    <div className='sidebar hidden sm:col-span-2 sm:block'>
                        {/* <ListFilter categories={categories} /> */}
                    </div>

                    <div className='page-content sm:col-span-6'>
                        <div className='flex flex-wrap'>
                            <div className='w-full sm:order-2 sm:mb-2'>
                                {/* <ItemBreadCrumb
                                    unit={{ name: unit.name, slug: unit.slug }}
                                    country={{
                                        name: country.name,
                                        code: country.code,
                                    }}
                                /> */}
                            </div>

                            <div className='page-header w-full px-3 sm:order-1 sm:px-0'>
                                <h1 className='my-4 text-xl font-semibold text-pink-800 sm:mb-3 sm:mt-0'>
                                    لیست تبلیغات در {city?.name} کشور {country.name}
                                </h1>
                            </div>
                        </div>

                        <div className='px-3 sm:px-0'>
                            <div className='md:hidden'>
                                {/* <FilterMobile />
                                <FilterModalMobile
                                    categories={categories}
                                /> */}
                            </div>

                            <Suspense
                                fallback={<Loading />}
                                key={`ads-${city?.name}`}
                            >
                                <CardsList
                                    country={country}
                                    search={search}
                                    pageNumber={pageNumber}
                                    category={category}
                                />
                            </Suspense>
                        </div>
                    </div>

                    <div className='mx-3 mt-5 sm:hidden'>
                        <SideBanner />
                    </div>
                </div>
            </div>
        </div>
    );
}
