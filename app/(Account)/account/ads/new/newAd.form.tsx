'use client';

import Pictures from './pictures';
import Input from '@/components/daisy/input';
import Textarea from '@/components/daisy/textarea';
import SelectWithFetching from '@/components/daisy/selectWithFetching';
import { useFormik } from 'formik';
import Button from '@/components/daisy/button';
import { useEffect } from 'react';

export default function NewAdForm() {
    const formik = useFormik({
        initialValues: {
            countryId: '',
            cityId: '',
            title: '',
            description: '',
            price: '',
            priceName: '',
        },
        onSubmit: () => {},
    });

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
                    label='متن قیمت'
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
                <SelectWithFetching
                    bordered
                    value={formik.values.cityId}
                    className='col-span-2'
                    route={
                        formik.values?.countryId
                            ? `/cities?page=1&limit=100&countryId=${formik.values?.countryId}`
                            : ''
                    }
                    label='شهر'
                    name='cityId'
                    isDisabled={!formik.values?.countryId}
                    paginated
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                />
            </div>

            <Button
                className='btn-primary mt-5 w-full'
                onClick={() => {
                    formik.handleSubmit();
                }}
            >
                ثبت آگهی
            </Button>
        </div>
    );
}
