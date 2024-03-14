'use client';

import { TopTools } from './layout/toptools';
import { OffCanvas } from './layout/offcanvas';
import { storeType } from '@/store/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { CountryNamespace } from '@/types/country';

type HeaderProps = {
    children: React.ReactNode;
    countries: CountryNamespace.GET[];
};

export const Header = ({ children, countries }: HeaderProps) => {
    const params = useParams();
    const country = useSelector((state: storeType) => state.stateSlice.country);

    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        const countryOrSlug = params.countryOrSlug as string;
        const isMainPage = !countryOrSlug || !countries.find(c => c.code === countryOrSlug);
        const countryCodeFromParams = isMainPage ? '' : countryOrSlug;
        setCountryCode(isMainPage ? 'un' : countryCodeFromParams ||  country || 'un');
    }, [params, countries, country]);
    
    return (
        <header className='w-full bg-white py-3'>
            <div className='container mx-auto max-w-[1144px]'>
                <div>
                    <div className='mx-3 flex justify-between sm:mx-0'>
                        <TopTools isMainPage={countryCode === 'un' || !countryCode} countryCode={countryCode} />

                        <div className='logo'>
                            <Link href='/'>
                                <Image
                                    src='/images/logo.svg'
                                    width={195}
                                    height={54}
                                    priority={true}
                                    alt='Pediland Logo'
                                    className='transition-all duration-75'
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <OffCanvas countryCode={countryCode} />

            {children}
        </header>
    );
};