'use client';

import Pictures from '../components/pictures';
import Input from '@/components/daisy/input';
import Textarea from '@/components/daisy/textarea';
import SelectWithFetching from '@/components/daisy/selectWithFetching';
import { useFormik } from 'formik';
import Button from '@/components/daisy/button';
import { useEffect, useState } from 'react';
import SelectCity from '@/components/daisy/selectCity';
// import useCreateAd from './useCreateAd';
import useSWR, { mutate } from 'swr';
import { useParams, useRouter } from 'next/navigation';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import useAdPicture from '@/store/useAdPicture';
import axios, { AxiosError } from 'axios';
import useFetchAd from '../hooks/useFetchAd';
import { axiosFetcher } from '@/app/swr/axiosFetcher';
import useCreateAd from '../hooks/useAdManagement';
import useUploadAdPictures from '../hooks/useUploadAdPictures';
import useAdManagement from '../hooks/useAdManagement';
import DeleteAdModal from '../components/deleteAd.modal';
// import useUploadAdPictures from './useUploadAdPictures';

type EditAdForm = {
    id: string;
    countryId: string | number;
    cityObject: any;
    title: string;
    description: string;
    price: string;
    priceName?: string;
    parentCategoryId: string | number;
    categoryId: string | number;
};

export default function EditAdForm() {
    // const {createAd, createAdLoading} = useCreateAd()
    const router = useRouter();

    const { updateAd, updateAdLoading } = useAdManagement();
    const { uploadAdPictures, uploadAdPicturesLoading } = useUploadAdPictures();

    const params = useParams();
    const adId = params.id as string;
    const { clearPictures, pictures } = useAdPicture();
    const {
        data: ad,
        isLoading: adLoading,
        error: adError,
    } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/ads/${params.id as string}`,
        axiosFetcher
    );

    const validationSchema = Yup.object().shape({
        countryId: Yup.string().required('لطفا کشور محل سکونت را انتخاب کنید'),
        cityObject: Yup.object().notRequired(),
        title: Yup.string().required('لطفا عنوان آگهی را وارد کنید'),
        description: Yup.string().required('لطفا توضیحات آگهی را وارد کنید'),
        price: Yup.string(),
        priceName: Yup.string().notRequired(),
        parentCategoryId: Yup.string().required(
            'لطفا دسته بندی اصلی را انتخاب کنید'
        ),
        categoryId: Yup.string().required('لطفا دسته بندی را انتخاب کنید'),
    });

    const formik = useFormik<EditAdForm>({
        initialValues: {
            id: '',
            countryId: '',
            cityObject: {},
            title: '',
            description: '',
            price: '',
            priceName: '',
            categoryId: '',
            parentCategoryId: '',
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
        onSubmit: async (values) => {
            // Delete pricename if not specified
            if (!values.priceName) {
                delete values.priceName;
            }
            await validationSchema.validate(values);
            // Check City
            if (values.cityObject) {
                if (!values.cityObject?.address?.city) {
                    toast.error(
                        'لطفا یک شهر انتخاب کنید. ایالت یا استان مورد قبول نیست'
                    );
                    return;
                }
            }
            await updateAd(adId, values).then(async () => {
                // Upload ad pictures if new pictures added
                if (pictures.length > 0) await uploadAdPictures(adId);

                // Mutate user data to Update ads
                await mutate(process.env.NEXT_PUBLIC_CHECKAUTH_URL).then(() => {
                    toast.success('آگهی شما با موفقیت ثبت شد');
                    router.push('/account/ads');

                    // Clear pictures
                    clearPictures();
                });
            });
        },
    });

    useEffect(() => {
        if (params.id && formik && ad) {
            formik.setValues({
                title: ad.title,
                description: ad.description,
                price: ad.price,
                priceName: ad.priceName,
                parentCategoryId: ad.category?.parent?.id,
                categoryId: ad.category.id,
                id: ad.id,
                countryId: ad.country.id,
                cityObject: undefined,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ad, params.id]);

    useEffect(() => {
        return () => clearPictures();
    }, []);

    return (
        <div className='mb-5 flex w-full max-w-lg flex-col items-center justify-center gap-y-2 px-2 '>
            <Pictures
                currentPicturesPath={ad?.pictures}
                adId={params.id as string}
            />
            <Input
                name='title'
                onChange={formik.handleChange}
                placeholder='عنوان آگهی'
                bordered
                label='عنوان آگهی'
                isInvalid={!!formik.errors.title}
                defaultValue={formik.values.title}
            />
            <Textarea
                name='description'
                onChange={formik.handleChange}
                label='توضیحات آگهی'
                placeholder='توضیحات آگهی'
                defaultValue={formik.values.description}
            />
            <div className='flex w-full gap-x-1'>
                <Input
                    name='price'
                    onChange={formik.handleChange}
                    placeholder='قیمت'
                    type='number'
                    bordered
                    label='قیمت'
                    className='w-1/2'
                    isInvalid={!!formik.errors.price}
                    defaultValue={formik.values.price}
                />
                <Input
                    name='priceName'
                    onChange={formik.handleChange}
                    placeholder='قیمت، ماهانه و..'
                    type='text'
                    bordered
                    label='متن قیمت( اجاره، شهریه.. )'
                    className='w-1/2'
                    isInvalid={!!formik.errors.priceName}
                    defaultValue={formik.values.priceName}
                />
            </div>
            <div className='mt-5 flex w-full gap-x-1'>
                <SelectWithFetching
                    bordered
                    value={formik.values.countryId}
                    circleFlag
                    className='col-span-2'
                    route='/countries'
                    label='انتخاب کشور'
                    name='countryId'
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                    defaultValue={formik.values.countryId}
                />
                {/* <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} /> */}
                <SelectCity
                    bordered
                    value={formik.values.cityObject}
                    className='col-span-2'
                    label={ad?.city?.name ? ad?.city?.name : 'انتخاب شهر'}
                    name='cityObject'
                    isDisabled={!formik.values?.countryId}
                    paginated
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                    searchAble
                    infiniteScroll
                    defaultValue={ad?.city?.name}
                />
            </div>

            <div className='mt-5 flex w-full gap-x-1'>
                <SelectWithFetching
                    bordered
                    value={formik.values.parentCategoryId}
                    className='col-span-2'
                    route='/ad-categories?justMain=true'
                    label='دسته‌بندی اصلی'
                    name='parentCategoryId'
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                    defaultValue={formik.values.parentCategoryId}
                />
                <SelectWithFetching
                    bordered
                    value={formik.values.categoryId}
                    className='col-span-2'
                    route={
                        formik.values?.parentCategoryId
                            ? `/ad-categories?parentId=${formik.values?.parentCategoryId}`
                            : ''
                    }
                    label='دسته بندی'
                    name='categoryId'
                    isDisabled={!formik.values?.parentCategoryId}
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                    defaultValue={formik.values.categoryId}
                />
            </div>

            <DeleteAdModal adId={adId}/>

            <div className='flex items-center justify-center gap-x-1 w-full'>
                <label htmlFor='delete_ad_modal' className='btn btn-ghost hover:bg-red-500 hover:text-white mt-5 w-3/12'>حذف اگهی</label>
                <Button
                    className='btn-primary mt-5 w-9/12'
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    isLoading={updateAdLoading || uploadAdPicturesLoading}
                >
                    آپدیت آگهی
                </Button>
            </div>
        </div>
    );
}
