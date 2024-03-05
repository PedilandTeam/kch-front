'use client';

import useCreateQueryString from '@/hooks/useCreateQueryString';
import useDeleteQueryString from '@/hooks/useDeleteQueryString';
import { CityNamespace } from '@/types/city';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import React, { memo, useEffect, useRef, useState } from 'react';
import { removeFromShouldBeAddType } from './city.filter';

type CityFilterItemProps = {
    city: CityNamespace.city;
    removeFromShouldBeAdd: removeFromShouldBeAddType;
};

type ParsedSearchParamsType = {
    city?: string[] | string;
};
function CityFilterSelectedItem({
    city,
    removeFromShouldBeAdd,
}: CityFilterItemProps) {
    const ref = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams() as unknown as URLSearchParams;
    const pathname = usePathname();
    const [parsedSearchParams, setParsedSearchParams] =
        useState<ParsedSearchParamsType>({});

    useEffect(() => {
        setParsedSearchParams(
            queryString.parse(searchParams.toString(), { arrayFormat: 'comma' })
        );
    }, [searchParams]);

    const createQueryString = useCreateQueryString();
    const deleteQueryString = useDeleteQueryString();

    const inputClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentTarget = event.currentTarget;
        if (!currentTarget.checked) {
            removeFromShouldBeAdd(currentTarget.value);
            return router.replace(
                `${pathname}?${deleteQueryString('city', currentTarget.value)}`
            );
        }
    };

    return (
        <label
            key={'selected-cityxc-filter-item-' + city.name}
            htmlFor={`city-select-${city.name}`}
            className='item flex cursor-pointer items-center py-2'
        >
            <input
                ref={ref}
                className='checkbox-secondary checkbox checkbox-sm ml-3'
                onChange={inputClickHandler}
                id={`city-select-${city.name}`}
                value={city.id}
                type='checkbox'
                checked={
                    parsedSearchParams.city
                        ? Array.isArray(parsedSearchParams.city)
                            ? !!parsedSearchParams.city.find(
                                  (param) => +param == city.id
                              )
                            : +parsedSearchParams.city == city.id
                        : false
                }
            />
            <label htmlFor={`city-select-${city.name}`}>{city.name}</label>
        </label>
    );
}

export default memo(CityFilterSelectedItem);
