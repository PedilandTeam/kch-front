'use client';

import { _TXT } from '@app/text/index';
import { CityNamespace } from '@/types/city';
import CityFilterItem from './city.filter.item';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useRouter } from 'next/navigation';
import CityFilterSelectedItem from './city.filter.selected.item';
import useCreateQueryString from '@/hooks/useCreateQueryString';
import useDeleteQueryString from '@/hooks/useDeleteQueryString';

type CityFilterType = {
    cities: CityNamespace.city[];
    id: string;
};
export type ParsedSearchParamsType = {
    city?: string[] | string;
};
export type addToShouldBeAddType = (item: string) => void;
export type removeFromShouldBeAddType = (item: string) => void;
export type checkHandlerType = (value: string | number) => boolean | undefined;

export default function CityFilter({ cities, id }: CityFilterType) {
    const [modifiedCities, setModifiedCities] = useState(cities);
    // const [shouldBeAdd, setShouldBeAdd] = useState<string[]>([])
    // const [shouldBeRemove, setShouldBeRemove] = useState<string[]>([])

    const searchParams = useSearchParams() as unknown as URLSearchParams;
    const pathname = usePathname();
    const [parsedSearchParams, setParsedSearchParams] =
        useState<ParsedSearchParamsType>({});
    const [isParsedSearchParamsAdded, setIsParsedSearchParamsAdded] =
        useState(false);

    const [shouldBeAdd, setShouldBeAdd] = useState<string[]>([]);

    const addToShouldBeAdd: addToShouldBeAddType = (item: string) => {
        if (shouldBeAdd.includes(item)) return;
        setShouldBeAdd((old) => [...old, item]);
    };

    const removeFromShouldBeAdd: removeFromShouldBeAddType = (item: string) => {
        setShouldBeAdd((old) => {
            const index = old.indexOf(item);
            if (index != -1) {
                old.splice(index, 1);
            }
            return [...old];
        });
    };

    const clearShouldBeAdd = () => {
        setShouldBeAdd([]);
    };

    useEffect(() => {
        setParsedSearchParams(
            queryString.parse(searchParams.toString(), { arrayFormat: 'comma' })
        );
    }, [searchParams]);

    useEffect(() => {
        if (isParsedSearchParamsAdded) return;
        if (!parsedSearchParams?.city) return;
        if (Array.isArray(parsedSearchParams.city)) {
            parsedSearchParams.city.forEach((cityId) => {
                addToShouldBeAdd(cityId);
            });
        } else {
            addToShouldBeAdd(parsedSearchParams.city);
        }
        setIsParsedSearchParamsAdded(true);
    }, [parsedSearchParams]);

    const createQueryString = useCreateQueryString();
    const deleteQueryString = useDeleteQueryString();

    const applyFilters = () => {
        router.replace(`${pathname}?${createQueryString('city', shouldBeAdd)}`);
    };

    const deleteAllCityHandler = () => {
        clearShouldBeAdd();
    };

    const checkHandler: checkHandlerType = (value: string | number) => {
        const hasItem = shouldBeAdd.find((n) => n == value);
        if (hasItem) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * find cities that have includes() searched string
     * if cities not exist do anything
     * @param event
     * @returns void
     */
    const citySearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!cities) return;
        const find = cities.filter((city) =>
            city.name.includes(event.currentTarget.value)
        );
        setModifiedCities(find);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    /**
     * auto focusing on search input
     */
    // useEffect(() => {
    //   if (inputRef.current) inputRef.current.focus();
    // }, [inputRef]);

    const router = useRouter();
    /**
     * save cities that are in city query
     * if city query have a single number it's return string
     * if city query have multiple numbers it's return Array[]
     */
    const citiesInQuery = queryString.parse(searchParams.toString(), {
        arrayFormat: 'comma',
    }).city;

    return (
        <div className='filter-section'>
            <label
                htmlFor={id}
                className='btn btn-outline btn-primary btn-wide'
            >
                {_TXT.CITY.SELECT}
            </label>
            <div className='my-3 px-3'>
                {Array.isArray(citiesInQuery) ? (
                    // if city is multiple number, find all of that from cities
                    citiesInQuery.map((cityId) => {
                        if (!cityId) return;
                        const city = cities.find((city) => city.id == +cityId);
                        if (!city) return;
                        return (
                            <CityFilterSelectedItem
                                removeFromShouldBeAdd={removeFromShouldBeAdd}
                                key={`city-selected-item-xz-${cityId}`}
                                city={city}
                            />
                        );
                    })
                ) : citiesInQuery &&
                  cities.find((city) => city.id == +citiesInQuery) ? (
                    <CityFilterSelectedItem
                        removeFromShouldBeAdd={removeFromShouldBeAdd}
                        key={`city-selected-item-xz-single-`}
                        city={cities.find((city) => city.id == +citiesInQuery)!}
                    />
                ) : null}
            </div>

            {/* Put this part before </body> tag */}
            <input type='checkbox' id={id} className='modal-toggle z-50' />
            <div className='modal'>
                <div className=' modal-box max-h-[550px] p-0 '>
                    <div className='w-full bg-white px-8 pb-3 pt-5'>
                        <h3 className='flex content-center justify-between text-lg font-bold'>
                            {_TXT.CITY.SELECT}
                            {citiesInQuery ? (
                                <span
                                    onClick={deleteAllCityHandler}
                                    className='cursor-pointer text-[15px] font-normal text-pink-800'
                                >
                                    {_TXT.CITY.DELETE_ALL}
                                </span>
                            ) : null}
                        </h3>
                        <p className='py-3'>{_TXT.CITY.SELECT_MULTI}</p>
                        <input
                            onChange={citySearchHandler}
                            type='text'
                            placeholder='جستجو در لیست شهرها'
                            className='input input-bordered w-full'
                            ref={inputRef}
                        />
                    </div>
                    <div className='h-[16rem] overflow-y-scroll px-8'>
                        {modifiedCities?.map((city: CityNamespace.city) => {
                            return (
                                <CityFilterItem
                                    key={`modified-city-filter-${city.name}`}
                                    removeFromShouldBeAdd={
                                        removeFromShouldBeAdd
                                    }
                                    parsedSearchParams={parsedSearchParams}
                                    checkHandler={checkHandler}
                                    shouldBeAdd={shouldBeAdd}
                                    addToShouldBeAdd={addToShouldBeAdd}
                                    city={city}
                                />
                            );
                        })}
                    </div>
                    <div className='flex'>
                        <div className='modal-action mt-3 box-border flex w-full items-center justify-between px-8 pb-5 pt-3 '>
                            <label
                                onClick={applyFilters}
                                htmlFor={id}
                                className='btn btn-primary w-full'
                            >
                                {_TXT.GENERAL.CONFIRM}
                            </label>
                        </div>
                    </div>
                </div>
                {/* <label className="modal-backdrop" htmlFor={id}>
          بستن
        </label> */}
            </div>
        </div>
    );
}
