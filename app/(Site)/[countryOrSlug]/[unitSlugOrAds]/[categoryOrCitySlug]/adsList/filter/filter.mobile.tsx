'use client';

import { _TXT } from '@/app/text';
import { FunnelIcon } from '@heroicons/react/24/outline';
import PagesSearch from '../../businessList/filter/pages.search';

export default function FilterMobile() {
    const openFilters = () => {
        if (document) {
            (
                document.getElementById('modal_unit_filter') as HTMLFormElement
            ).showModal();
        }
    };
    return (
        <>
            <button
                onClick={openFilters}
                className='filter-title z-50 mb-3 flex w-full cursor-pointer rounded-xl border bg-slate-50 p-3 md:hidden'
            >
                <FunnelIcon className='ml-2 h-5 w-5' />
                <span className='font-semibold'>{_TXT.FILTER.SELECT}</span>
            </button>
            <PagesSearch />
        </>
    );
}
