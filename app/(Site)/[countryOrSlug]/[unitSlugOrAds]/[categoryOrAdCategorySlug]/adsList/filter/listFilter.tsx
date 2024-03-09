'use client';
import { _TXT } from '@/app/text';
import { FunnelIcon } from '@client-packages/heroicons/components';
import { CityNamespace } from '@/types/city';
import { CategoryNamespace } from '@/types/category';
import CityFilter from './city.filter';
import CategoryFilter from './category.filter';
import PageSearch from './page.search';
import SideBanner from '@/app/banners/side-banner';
import FilterModalMobile from './filterModal.mobile';
import { AdCategoryNamepace } from '@/types/adCategory';
import SubMenu from '@/app/(Site)/components/categoriesMeny/subMenu';
import { CountryNamespace } from '@/types/country';

type ListFilterProps = {
    categories: AdCategoryNamepace.IAdCategory[];
    cities: CityNamespace.GET,
    country: CountryNamespace.GET
};
export default function ListFilter({ categories, cities, country }: ListFilterProps) {
    return (
        <div className='filter-unit z-20 sm:sticky sm:top-4'>
            <div className='filter-title mb-4 hidden w-full border-b-[2px] border-b-gray-200 pb-2 md:flex md:items-center'>
                <FunnelIcon className='ml-2 h-4 w-4' />
                <span className='font-semibold'>{_TXT.FILTER._S}</span>
            </div>

            <div className='filter-body hidden md:block'>
                <PageSearch />
                <CityFilter id='cityfilter-modal' cities={cities?.items} />
                {/* <CategoryFilter
                    id='categoryfilter-modal'
                    categories={categories}
                /> */}
                <SubMenu items={categories} basePath={`/${country.code}/ads`}/>
            </div>

            <div className='hidden sm:block'>
                <SideBanner />
            </div>
        </div>
    );
}
