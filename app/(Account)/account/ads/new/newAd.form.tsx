'use client';

import Pictures from './pictures';
import Input from '@/components/daisy/input';
import Textarea from '@/components/daisy/textarea';
import SelectWithFetching from '@/components/daisy/selectWithFetching';
import { useFormik } from 'formik';
import Button from '@/components/daisy/button';
import { useEffect } from 'react';
import SelectCity from '@/components/daisy/selectCity';
import useCreateAd from './useCreateAd';

export default function NewAdForm() {

    const {createAd, createAdLoading} = useCreateAd()

    const formik = useFormik({
        initialValues: {
            countryId: '',
            cityObject: {},
            title: '',
            description: '',
            price: '',
            priceName: '',
            categoryId: '',
            parentCategoryId: '',
        },
        onSubmit: (values) => {
            createAd(values)
        },
    });

    useEffect(() => {
        console.log(formik.values);
    }, [formik.values]);

    return (
        <div className='mb-5 flex w-full max-w-lg flex-col items-center justify-center gap-y-2 px-2 '>
            <Pictures />
            <Input
                name='title'
                onChange={formik.handleChange}
                placeholder='عنوان آگهی'
                bordered
                label='عنوان آگهی'
            />
            <Textarea
                name='description'
                onChange={formik.handleChange}
                label='توضیحات آگهی'
                placeholder='توضیحات آگهی'
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
                />
                <Input
                    name='priceName'
                    onChange={formik.handleChange}
                    placeholder='قیمت، ماهانه و..'
                    type='text'
                    bordered
                    label='متن قیمت( اجاره، شهریه.. )'
                    className='w-1/2'
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
                {/* <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} /> */}
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
                isLoading={createAdLoading}
            >
                ثبت آگهی
            </Button>
        </div>
    );
}
