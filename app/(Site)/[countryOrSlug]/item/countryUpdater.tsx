'use client';

import { setCountry } from '@/store/stateSlice';
import { PageNamespace } from '@/types/page';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

type countryUpdater = { pageData: PageNamespace.Page };
const CountryUpdater: FC<countryUpdater> = ({ pageData }: countryUpdater) => {
    const dis = useDispatch();
    dis(setCountry(pageData?.country?.code));
    return <></>;
}
export default CountryUpdater