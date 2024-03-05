'use client';
import { _TXT } from '@app/text/index';
import { FunnelIcon } from '@client-packages/heroicons/components';
import FilterMobile from './filterModal.mobile';
import { CityNamespace } from '@/types/city';
import CityFilter from '../../filter/city.filter';
import PageSearch from '../../filter/page.search';
import SideBanner from '@/app/banners/side-banner';

type ListFilterProps = {
    cities: CityNamespace.GET;
    // categories: CategoryNamespace.category[]
};
export default function CategoryListFilter({ cities }: ListFilterProps) {
    return (
        <div className='filter-unit z-20 sm:sticky sm:top-4'>
            <div className='filter-title mb-4 hidden w-full border-b-[2px] border-b-gray-200 pb-2 md:flex md:items-center'>
                <FunnelIcon className='ml-2 h-4 w-4' />
                <span className='font-semibold'>{_TXT.FILTER._S}</span>
            </div>

            <div className='filter-body hidden md:block'>
                <PageSearch />
                <CityFilter
                    id='category-cities-filter'
                    cities={cities?.items}
                />
            </div>

            <div className='hidden sm:block'>
                <SideBanner />
            </div>
        </div>
    );
}
