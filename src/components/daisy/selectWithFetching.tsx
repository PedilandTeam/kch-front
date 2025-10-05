'use client';
import { fetcher } from '@/hooks/fetcher';
import { FormEvent, memo, useEffect, useState } from 'react';
import useSWR from 'swr';
import { CircleFlag } from 'next-circle-flags';
import Select from './select';
import Option from './option';

// import Select from '@daisyComponents/select';
// import Option from '@daisyComponents/option';
// import { useInView } from 'react-intersection-observer';

type SelectWithFetching = {
    route?: string;
    label: string;
    paginated?: boolean;
    name: string;
    isDisabled?: boolean;
    circleFlag?: boolean;
    formErrors: any;
    setFieldValue: (name: string, value: any) => void;
    className?: string;
    value?: any;
    bordered?: boolean;
    searchAble?: boolean;
    infiniteScroll?: boolean;
    defaultValue?: any;
};
export default memo(function SelectWithFetching<T extends { items: any }>({
    route,
    label,
    paginated = false,
    name,
    isDisabled = false,
    circleFlag = false,
    formErrors,
    setFieldValue,
    className,
    value,
    bordered,
    searchAble = false,
    infiniteScroll = false,
    defaultValue,
}: SelectWithFetching) {

    const [search, setSearch] = useState('');

    const { data, isLoading, error } = useSWR<T>(
        route ? `${process.env.NEXT_PUBLIC_API_URL}${route}${search ? `&search=${search}` : ''}` : null,
        fetcher
    );

    return (
        <Select
            className={className}
            dir='ltr'
            items={data ? (paginated ? data?.items : data) : []}
            onChange={(e, value) => setFieldValue(name, value)}
            // isLoading={isLoading}
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
                    // {...defaultValue == item.id ? { defaultSelected: true } : {}}
                    key={item.id}
                    value={item.id}
                    startContent={
                        circleFlag ? (
                            <CircleFlag
                                countryCode={item.code}
                                height={20}
                                width={20}
                                alt={`پرچم کشور ${item.name}`}
                            />
                        ) : null
                    }
                >
                    {item.name || item.title}
                </Option>
            )}
        </Select>
    );
});
