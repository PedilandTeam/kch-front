'use client';

import { usePages } from '@/hooks/swr/usePages';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import ItemProfilePicture from '../[unitSlugOrAds]/[categoryOrCitySlug]/businessList/item/itemProfilePicture';

type CountryPagesSearch = {
    countryCode: string;
};

const PagesSearch = ({ countryCode }: CountryPagesSearch) => {
    const [search, setSearch] = useState<string>();

    const {
        data: pages,
        isLoading,
        error,
    } = usePages(
        1,
        search ? 10 : 5,
        countryCode,
        undefined,
        undefined,
        undefined,
        search ? search : undefined
    );

    let timeoutPointer: NodeJS.Timeout;
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutPointer);
        timeoutPointer = setTimeout(() => {
            setSearch(e.target.value);
        }, 1000);
    };

    return (
        <div className='dropdown mx-auto mb-5 mt-4 block w-full px-4 sm:w-[600px] sm:px-0'>
            <input
                onChange={inputChangeHandler}
                type='text'
                placeholder='اینجا تایپ کن'
                className='input h-[54px] w-full rounded-xl text-center text-[18px] font-medium opacity-80 hover:opacity-100 focus:opacity-100'
            />
            {search && pages && (
                <ul
                    tabIndex={0}
                    className='menu dropdown-content z-[1] mt-1 w-11/12 rounded-xl bg-base-100 p-2 shadow sm:w-full'
                >
                    {pages?.meta?.itemCount > 0 ? (
                        pages.items?.map((page) => {
                            return (
                                <li key={page.id}>
                                    <Link
                                        className='flex justify-start'
                                        href={`/${page.slug}`}
                                    >
                                        <ItemProfilePicture
                                            pageData={page}
                                            height={30}
                                            width={30}
                                        />
                                        <p>{page.title}</p>
                                    </Link>
                                </li>
                            );
                        })
                    ) : (
                        <li>
                            <p className='justify-center'>
                                متاسفانه، موردی پیدا نشد.
                            </p>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default PagesSearch;
