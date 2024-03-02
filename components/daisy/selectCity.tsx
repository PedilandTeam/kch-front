

'use client';
import { fetcher } from '@/app/swr/fetcher';
import { FormEvent, memo, useEffect, useState } from 'react';
import useSWR from 'swr';
import { CircleFlag } from 'next-circle-flags';
import Select from '@daisyComponents/select';
import Option from '@daisyComponents/option';
import { useInView } from 'react-intersection-observer';

type CityApiService = "HERE";
type SelectWithFetching = {
    route?: string;
    label: string;
    paginated?: boolean;
    name: string;
    isDisabled?: boolean;
    formErrors: any;
    setFieldValue: (name: string, value: any) => void;
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
}: SelectWithFetching) {


    const [search, setSearch] = useState('');
    const [selectedCityId, setSelectedCityId] = useState()
    

    const { data, isLoading, error } = useSWR<T>(
        apiService == "HERE" && search ? `${process.env.NEXT_PUBLIC_HERE_API_URL}/autocomplete?q=${search}&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}` : null,
        fetcher
    );

    useEffect(() => {
        if (!(data && selectedCityId && Array.isArray(data?.items))) return;
        const selectedCity = data.items.find((item: any) => item.id == selectedCityId)
        if (selectedCity) {
            setFieldValue(name, selectedCity)
        } else {
            setSearch('')
            setSelectedCityId(undefined)
        }
        
    }, [selectedCityId, data])

    return (
        <Select
            className={className}
            dir='ltr'
            items={data?.items ?? data}
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
