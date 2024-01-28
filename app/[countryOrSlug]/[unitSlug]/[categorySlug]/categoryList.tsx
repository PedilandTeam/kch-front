import { API_ROUTES } from '@/routes';
import { CategoryNamespace } from '@/types/category';
import { CityNamespace } from '@/types/city';
import { UnitType } from '@/types/unit';
import joiner from '@/utils/joiner';
import { notFound } from 'next/navigation';
import { ItemBreadCrumb } from './breadcrumb';
import { CardsList } from './cardsList';
import ListFilter from './filter/listFilter';
import { CountryNamespace } from '@/types/country';
import { Suspense } from 'react';
import Loading from '../_loading';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { _TXT } from '@/app/text';
import SideBanner from '@/app/banners/side-banner';
import FilterMobile from './filter/filter.mobile';
import FilterModalMobile from './filter/filterModal.mobile';

type PagesListProps = {
  category: CategoryNamespace.category;
  country: CountryNamespace.GET;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string;
};

async function fetchCities(
  countryCode: string,
  categoryId: number
): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;

  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        categoryIds: joiner(categoryId),
      })
    ).json();
  } catch (e) {
    console.log(await e);
    throw new Error('error in get cities fetchCities');
  }

  return cities;
}

export default async function CategoryList({
  category,
  country,
  unit,
  pageNumber,
  city,
  search,
}: PagesListProps) {
  if (!country) return notFound();
  const cities = await fetchCities(country.code, category.id);

  return (
    <div className='component page-list sm:mt-3'>
      <div className='container mx-auto max-w-[1144px]'>
        <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-8 sm:gap-8'>
          <div className='sidebar hidden sm:col-span-2 sm:block'>
            <ListFilter cities={cities} />
          </div>

          <div className='page-content sm:col-span-6'>
            <div className='flex flex-wrap'>
              <div className='w-full sm:order-2 sm:mb-2'>
                <ItemBreadCrumb
                  unit={unit}
                  category={category}
                  country={{ name: country.name, code: country.code }}
                />
              </div>

              <div className='page-header w-full px-3 sm:order-1 sm:px-0'>
                <h1 className='my-4 text-xl font-semibold text-pink-800 sm:mb-3 sm:mt-0'>
                  لیست{' '}
                  {category?.seoTitle
                    ? category.seoTitle
                    : `${category.name} فارسی زبان`}{' '}
                  در {country?.name}{' '}
                </h1>
              </div>
            </div>
            <div className='px-3 sm:px-0'>
              <div className='md:hidden'>
                <FilterMobile />
                <FilterModalMobile cities={cities.items} />
              </div>

              <Suspense
                fallback={<Loading />}
                key={`unit-cardlist-${search}-${city}-${category}`}
              >
                <CardsList
                  category={category}
                  country={country}
                  pageNumber={pageNumber}
                  city={city}
                  search={search}
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
