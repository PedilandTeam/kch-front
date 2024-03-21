'use client';

import { _TXT } from '@/app/text';
import { FunnelIcon } from '@heroicons/react/24/solid';
import CityFilter from './city.filter';
import CategoryFilter from './category.filter';
import { CityNamespace } from '@/types/city';
import { CategoryNamespace } from '@/types/category';
import PagesSearch from '../[categoryOrAdCategorySlug]/businessList/filter/pages.search';

type FilterMobileProps = {
    cities: CityNamespace.city[];
};

export default function FilterModalMobile({cities}: FilterMobileProps) {
    return (
        <>
            <dialog id='modal_unit_filter' className='modal'>
                <form
                    method='dialog'
                    className='modal-box h-full max-h-full w-full rounded-none'
                >
                    <div className='filter-title mb-4 flex w-full border-b-[2px] border-b-gray-200 pb-2'>
                        <FunnelIcon className='ml-2 h-4 w-4' />
                        <span className='font-semibold'>{_TXT.FILTER._S}</span>
                    </div>
                    <div>
                        <CityFilter
                            id='mobile-cityfilter-modal'
                            cities={cities}
                        />
                    </div>
                    <div className='modal-action'>
                        <button className='btn w-full'>
                            {_TXT.FILTER.APPLY}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
