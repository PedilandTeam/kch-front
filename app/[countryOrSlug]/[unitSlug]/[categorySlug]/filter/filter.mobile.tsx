'use client'

import { _TXT } from "@/app/text"
import { FunnelIcon } from "@heroicons/react/24/outline"
import PagesSearch from "./pages.search";


export default function FilterMobile() {

    const openFilters = () => {
        if (document) {
            (
                document.getElementById(
                    "modal_category_filter"
                ) as HTMLFormElement
            ).showModal();
        }
    }

    return (
        <>
            <button
                onClick={openFilters}
                className="filter-title w-full flex md:hidden border p-3 bg-slate-50 rounded-xl mb-3">
                <FunnelIcon className="h-5 w-5 ml-2" />
                <span className="font-semibold">{_TXT.FILTER.SELECT}</span>
            </button>
            <PagesSearch/>
        </>
    )

}