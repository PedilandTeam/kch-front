import { _TXT } from '@/app/text';
import { ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import CircleFlag from '@/app/client-packages/circleflag';
import Rating from '@client-packages/react-rating';
import { PageNamespace } from '@/types/page';
import SocialLink from './socials/socialLink';
import { socials as socialsType } from '@/types/socials.';
import { useDispatch } from 'react-redux';
import { setCountry } from '@/store/stateSlice';
import ItemProfilePicture from './itemProfilePicture';
import Link from 'next/link';
import InstagramIcon from './socials/instagram';
import FacebookIcon from './socials/facebook';
import YoutubeIcon from './socials/youtube';
import TelegramIcon from './socials/telegram';

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
    const socials = { ...pageData.socials };
    delete socials.website;
    const haveSocial = pageData.socials && Object.keys(socials).length > 0;

    return (
        <div className='top-section h-full'>
            <div className='container mx-auto h-full max-w-[1144px]'>
                <div className='flex h-full flex-col items-center pt-8 sm:flex-row sm:items-end sm:pb-10'>
                    <ItemProfilePicture
                        className='mb-5 h-[240px] w-[240px] rounded-full drop-shadow-sm sm:mb-0 sm:h-40 sm:w-40'
                        pageData={pageData}
                    />

                    <div className='item-details flex-1 sm:mr-5'>
                        <h1 className='text-center text-[28px] font-semibold text-slate-700 sm:text-right'>
                            {pageData?.title}
                        </h1>
                        <div className='card-rating my-4 flex items-center'>
                            {/* @ts-ignore */}
                            <Rating
                                initialRating={0}
                                direction={'rtl'}
                                readonly={true}
                                emptySymbol={
                                    <StarIcon className='h-8 w-8 text-gray-300' />
                                }
                                fullSymbol={
                                    <StarIcon className='h-8 w-8 text-yellow-400' />
                                }
                            />
                            <span className='mr-2 text-gray-500'>
                                (<span>بدون</span> نظر)
                                <span className='mx-2 text-gray-400'>|</span>
                                بزودی
                            </span>
                        </div>
                        <div className='item-location mb-6 flex justify-center text-gray-600 sm:mb-3 sm:justify-start'>
                            <CircleFlag
                                width={1}
                                height={1}
                                countryCode={pageData?.country?.code}
                                className='ml-2 w-5'
                                title={_TXT.COUNTRY.GERMANY}
                            />
                            <span>{pageData?.country?.name}</span>
                            <span className='ml-1'>،</span>
                            <span>{pageData?.city?.name}</span>
                        </div>
                    </div>

                    {!haveSocial ? (
                        <p className='text-[14px] text-slate-600'>
                            هیچ رسانه اجتماعی ثبت نشده است.
                        </p>
                    ) : (
                        <div
                            className={`item-top-socials flex w-full justify-center bg-slate-200 py-4 sm:w-auto sm:rounded-lg sm:bg-transparent sm:py-0 [&>a:last-child]:ml-0 [&>a]:ml-4`}
                        >
                            {pageData?.socials?.telegram ? (
                                <Link
                                    href={`https://t.me/${pageData?.socials?.telegram}`}
                                    target='_blank'
                                    rel='nofollow noopener'
                                >
                                    <TelegramIcon />
                                </Link>
                            ) : null}
                            {pageData.socials?.instagram ? (
                                <Link
                                    href={`https://www.instagram.com/${pageData.socials?.instagram}`}
                                    target='_blank'
                                    rel='nofollow noopener'
                                >
                                    <InstagramIcon />
                                </Link>
                            ) : null}
                            {pageData.socials?.facebook ? (
                                <Link
                                    href={`https://www.facebook.com/${pageData.socials?.facebook}`}
                                    target='_blank'
                                    rel='nofollow noopener'
                                >
                                    <FacebookIcon />
                                </Link>
                            ) : null}

                            {pageData.socials?.youtube ? (
                                <Link
                                    href={`https://www.youtube.com/${pageData.socials?.youtube}`}
                                    target='_blank'
                                    rel='nofollow noopener'
                                >
                                    <YoutubeIcon />
                                </Link>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
