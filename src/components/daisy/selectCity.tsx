

'use client';
import { fetcher } from '@/hooks/fetcher';
import { memo, useEffect, useState } from 'react';
import useSWR from 'swr';
import Select from './select';
import Option from './option';
import { CityNamespace } from '@/types/city';
import toast from 'react-hot-toast';

type CityApiService = "HERE";
type SelectWithFetching = {
    route?: string;
    label: string;
    paginated?: boolean;
    name: string;
    isDisabled?: boolean;
    formErrors: any;
    setFieldValue: (name: string, value: any) => void;
    countryId: string | number,
    className?: string;
    value?: any;
    bordered?: boolean;
    searchAble?: boolean;
    infiniteScroll?: boolean;
    apiService?: CityApiService,
    defaultValue?: any;
};
export default memo(function SelectCity<T extends { items: any }>({
    name,
    isDisabled = false,
    formErrors,
    setFieldValue,
    className,
    value,
    bordered,
    searchAble = false,
    apiService = "HERE",
    defaultValue,
    label,
    countryId
}: SelectWithFetching) {


    const [search, setSearch] = useState('');
    const [selectedCityId, setSelectedCityId] = useState()
    const [cities, setCities] = useState<CityNamespace.city[]>()


    

    useEffect(() => {
        const fetchCities = async () => {
            if (!countryId) return;
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities?limit=10&page=1&countryId=${countryId}${search ? `&search=${search}` : ""}`)
            .then(async res => {
                if (!res.ok) {
                    toast.error('خطایی رخ داد')
                    return
                }
                setCities(await (await res.json())?.items || [])
            })
            .catch(e => {
                toast.error('خطای ارتباط، اینترنت خود را بررسی کنید')
            })
        }
        fetchCities()
    }, [search, countryId])

    const { data, isLoading, error } = useSWR<T>(
        apiService == "HERE" && (typeof cities === 'undefined' || cities.length === 0) && search ? `${process.env.NEXT_PUBLIC_HERE_API_URL}/autocomplete?q=${search}&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}` : null,
        fetcher
    );

    useEffect(() => {

        if (cities?.length) {
            setFieldValue('cityId', selectedCityId)
        }

        if (!(data && selectedCityId && Array.isArray(data?.items))) return;

        // If City comes from HERE API
        if (data) {
            const selectedCity = data.items.find((item: any) => item.id == selectedCityId)
            if (selectedCity) {
                setFieldValue(name, selectedCity)
            } else {
                setSearch('')
                setSelectedCityId(undefined)
            }
            return 
        }        
    }, [selectedCityId, data])

    return (
        <Select
            className={className}
            dir='ltr'
            items={cities ? cities : (data?.items ?? data)}
            onChange={(e, value) => setSelectedCityId(value)}
            isDisabled={isDisabled}
            errorMessage={formErrors![name]}
            isInvalid={!!formErrors![name] ? true : false}
            label={label}
            value={value}
            bordered={bordered}
            setSearch={searchAble ? setSearch : undefined}
            defaultValue={defaultValue}
        >
            {(item: any) => (
                <Option
                    key={item.id}
                    value={item.id}
                >
                    {item.name || item.title}
                </Option>
            )}
        </Select>
    );
});
