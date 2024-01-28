'use client';

import { _TXT } from '@/app/text';
import { FunnelIcon } from '@heroicons/react/24/outline';
import PagesSearch from './pages.search';

export default function FilterMobile() {
  const openFilters = () => {
    if (document) {
      (
        document.getElementById('modal_category_filter') as HTMLFormElement
      ).showModal();
    }
  };

  return (
    <>
      <button
        onClick={openFilters}
        className='filter-title mb-3 flex w-full rounded-xl border bg-slate-50 p-3 md:hidden'
      >
        <FunnelIcon className='ml-2 h-5 w-5' />
        <span className='font-semibold'>{_TXT.FILTER.SELECT}</span>
      </button>
      <PagesSearch />
    </>
  );
}
