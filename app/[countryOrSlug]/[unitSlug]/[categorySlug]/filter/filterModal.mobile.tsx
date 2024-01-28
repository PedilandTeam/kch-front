'use client';

import { _TXT } from '@app/text/index';
import { FunnelIcon } from '@heroicons/react/24/solid';
// import CityFilter from "./city.filter";
import { CityNamespace } from '@/types/city';
import CityFilter from '../../filter/city.filter';
import PagesSearch from './pages.search';

type FilterMobileProps = {
  cities: CityNamespace.city[];
};

export default function FilterModalMobile({ cities }: FilterMobileProps) {
  return (
    <>
      <dialog id='modal_category_filter' className='modal'>
        <form
          method='dialog'
          className='modal-box h-full max-h-full w-full rounded-none'
        >
          <div className='filter-title flex w-full border-b-[2px] border-b-gray-200 pb-2'>
            <FunnelIcon className='ml-2 h-4 w-4' />
            <span className='font-semibold'>{_TXT.FILTER._S}</span>
          </div>
          <div className='py-4'>
            <CityFilter
              id='mobile-categoryList-cityfilter-modal'
              cities={cities}
            />
          </div>
          <div className='modal-action'>
            <button className='btn w-full'>{_TXT.FILTER.APPLY}</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
