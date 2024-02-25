'use client';

import Pictures from '../components/pictures';
import Input from '@/components/daisy/input';
import Textarea from '@/components/daisy/textarea';
import SelectWithFetching from '@/components/daisy/selectWithFetching';
import { useFormik } from 'formik';
import Button from '@/components/daisy/button';
import { useEffect } from 'react';
import SelectCity from '@/components/daisy/selectCity';
// import useCreateAd from './useCreateAd';
import { mutate } from 'swr';
import { useParams, useRouter } from 'next/navigation';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import useAdPicture from '@/store/useAdPicture';
import axios, { AxiosError } from 'axios';
import useFetchAd from '../hooks/useFetchAd';
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
    const router = useRouter()


    const params = useParams()
    useEffect(() => {
        console.log(params);
    }, [params])
    const {fetchAd, fetchAdLoading} = useFetchAd()




    // const {uploadAdPictures, uploadAdPicturesLoading} = useUploadAdPictures()

    const validationSchema = Yup.object().shape({
        countryId: Yup.string().required('لطفا کشور محل سکونت را انتخاب کنید'),
        cityObject: Yup.object().required('لطفا شهر محل سکونت را انتخاب کنید'),
        title: Yup.string().required('لطفا عنوان آگهی را وارد کنید'),
        description: Yup.string().required('لطفا توضیحات آگهی را وارد کنید'),
        price: Yup.string(),
        priceName: Yup.string(),
        parentCategoryId: Yup.string().required('لطفا دسته بندی اصلی را انتخاب کنید'),
        categoryId: Yup.string().required('لطفا دسته بندی را انتخاب کنید'),
    })

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
            // if (!values.priceName) {
            //     delete values.priceName
            // }
            // await validationSchema.validate(values)

            // // Check City
            // if (!values.cityObject?.address?.city) {
            //     toast.error('لطفا یک شهر انتخاب کنید. ایالت یا استان مورد قبول نیست')
            //     return;
            // }
            // await createAd(values).then(async (id) => {


            //     // Upload ad pictures
            //     await uploadAdPictures(id)
                

            //     // Mutate user data to Update ads
            //     await mutate(process.env.NEXT_PUBLIC_CHECKAUTH_URL).then(() => {
            //         toast.success('آگهی شما با موفقیت ثبت شد')
            //         router.push('/account/ads')
            //     })
            // })
        },
    });

    useEffect(() => {
        async function fetchAdData() {
            if (params.id && formik && fetchAd) {
                await fetchAd(params.id as string).then(async data => {
                    console.log(data);
                    // description: data.description,
                    // price: data.price,
                    // priceName: data.priceName,
                    // parentCategoryId: data.parentCategoryId,
                    // categoryId: data.category.id,
                    // id: data.id,
                    // countryId: data.country.id,
                    // cityObject: data.city
                    
                    await formik.setFieldValue('title', data.title)
                    await formik.setFieldValue('description', data.description)
                    await formik.setFieldValue('price', data.price)
                    await formik.setFieldValue('priceName', data.priceName)
                    await formik.setFieldValue('parentCategoryId', data.parentCategoryId)
                    await formik.setFieldValue('categoryId', data.category.id)
                    await formik.setFieldValue('id', data.id)
                    await formik.setFieldValue('countryId', data.country.id)
                    await formik.setFieldValue('cityObject', data.city)
                })
            }
        }
        fetchAdData()
    }, [params.id])

    useEffect(() => {
        console.log(formik.values);
        
    }, [formik])

    return (
        <div className='mb-5 flex w-full max-w-lg flex-col items-center justify-center gap-y-2 px-2 '>
            <Pictures />
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
                    label='شهر'
                    name='cityObject'
                    isDisabled={!formik.values?.countryId}
                    paginated
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                    searchAble
                    infiniteScroll
                    // defaultValue={formik.values.cityObject.id}
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
                />
            </div>

            <Button
                className='btn-primary mt-5 w-full'
                onClick={() => {
                    formik.handleSubmit();
                }}
                // isLoading={createAdLoading || uploadAdPicturesLoading}
            >
                ثبت آگهی
            </Button>
        </div>
    );
}
