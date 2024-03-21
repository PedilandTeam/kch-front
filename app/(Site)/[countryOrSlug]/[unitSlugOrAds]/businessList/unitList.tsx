import { API_ROUTES } from '@/routes';
import { CategoryNamespace } from '@/types/category';
import { CityNamespace } from '@/types/city';
import { CountryNamespace } from '@/types/country';
import { UnitType } from '@/types/unit';
import joiner from '@/utils/joiner';
import { CardsList } from './cardsList';
import ListFilter from '@/app/(Site)/components/filter/listFilter';
import { Suspense } from 'react';
import Loading from '../_loading';
import SideBanner from '@/app/banners/side-banner';
import FilterMobile from '@/app/(Site)/components/filter/filter.mobile';
import FilterModalMobile from '@/app/(Site)/components/filter/filterModal.mobile';
import { BreadCrumb } from '@/app/(Site)/components/breadcrumb';

type PagesListProps = {
    unit: UnitType;
    country: CountryNamespace.GET;
    pageNumber?: number;
    city?: number | number[];
    category?: number | number[];
    search?: string;
};

async function fetchCities(
    countryCode: string,
    unitIds: number,
    categoryIds?: number | number[]
): Promise<CityNamespace.GET> {
    let cities: CityNamespace.GET;
    try {
        cities = await (
            await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {
                page: 1,
                limit: 100,
                unitIds: unitIds,
                categoryIds: joiner(categoryIds),
            })
        ).json();
    } catch (e) {
        console.log(await e);
        throw new Error('error in get cities fetchCities');
    }

    return cities;
}

async function fetchCategories(
    countryCode: string,
    unitIds: number | number[],
    cityIds?: number | number[]
): Promise<CategoryNamespace.GET> {
    let categories: CategoryNamespace.GET | undefined;
    try {
        categories = await (
            await API_ROUTES.CATEGOREIS.BY_COUNTRY(countryCode, {
                page: 1,
                limit: 100,
                unitIds: joiner(unitIds),
                cityIds: joiner(cityIds),
            })
        ).json();
    } catch (e) {
        console.log(e);
        throw new Error('Error in get Categories fetchCategories');
    }

    return categories!;
}

export default async function UntiList({
    unit,
    country,
    pageNumber,
    city,
    category,
    search,
}: PagesListProps) {
    const cities = await fetchCities(country.code, unit.id, category);
    const categories: CategoryNamespace.category[] = (
        await fetchCategories(country.code, unit.id, city)
    ).items;

    return (
        <div className='component page-list sm:mt-3'>
            <div className='container mx-auto max-w-[1144px]'>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-8 sm:gap-8'>
                    <div className='sidebar hidden sm:col-span-2 sm:block'>
                        <ListFilter cities={cities} categories={categories} />
                    </div>

                    <div className='page-content sm:col-span-6'>
                        <div className='flex flex-wrap'>
                            <div className='w-full sm:order-2 sm:mb-2'>
                                <BreadCrumb
                                    items={[
                                        {
                                            name: country.name,
                                            path: `${country.code}`,
                                        },
                                        {
                                            name: unit.name,
                                            path: `/${country.code}/${unit.slug}`,
                                        },
                                    ]}  
                                />
                            </div>

                            <div className='page-header w-full px-3 sm:order-1 sm:px-0'>
                                <h1 className='my-4 text-xl font-semibold text-pink-800 sm:mb-3 sm:mt-0'>
                                    لیست {unit?.name} فارسی زبان در{' '}
                                    {country?.name}
                                </h1>
                            </div>
                        </div>

                        <div className='px-3 sm:px-0'>
                            <div className='md:hidden'>
                                <FilterMobile />
                                <FilterModalMobile
                                    cities={cities.items}
                                    categories={categories}
                                />
                            </div>

                            <Suspense
                                fallback={<Loading />}
                                key={`unit-cardlist-${search}-${city}-${category}`}
                            >
                                <CardsList
                                    unit={unit}
                                    country={country}
                                    category={category}
                                    search={search}
                                    pageNumber={pageNumber}
                                    city={city}
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
