"use client";

import useAdPicture from "@/store/useAdPicture";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import * as Yup from "yup";
import Pictures from "../components/pictures";
import useAdManagement from "../hooks/useAdManagement";
import useUploadAdPictures from "../hooks/useUploadAdPictures";
import { Button, Input } from "@components";

type NewAdForm = {
  countryId: string | number;
  cityObject: any;
  title: string;
  description: string;
  price: string;
  priceName?: string;
  parentCategoryId: string | number;
  categoryId: string | number;
};

export default function NewAdForm() {
  const { createAd, createAdLoading } = useAdManagement();
  const router = useRouter();

  const { clearPictures, pictures } = useAdPicture();

  const { uploadAdPictures, uploadAdPicturesLoading } = useUploadAdPictures();

  const validationSchema = Yup.object().shape({
    countryId: Yup.string().required("لطفا کشور محل سکونت را انتخاب کنید"),
    cityObject: Yup.object().required("لطفا شهر محل سکونت را انتخاب کنید"),
    title: Yup.string().required("لطفا عنوان آگهی را وارد کنید"),
    description: Yup.string().required("لطفا توضیحات آگهی را وارد کنید"),
    price: Yup.string(),
    priceName: Yup.string(),
    parentCategoryId: Yup.string().required(
      "لطفا دسته بندی اصلی را انتخاب کنید",
    ),
    categoryId: Yup.string().required("لطفا دسته بندی را انتخاب کنید"),
  });

  const formik = useFormik<NewAdForm>({
    initialValues: {
      countryId: "",
      cityObject: {},
      title: "",
      description: "",
      price: "",
      priceName: "",
      categoryId: "",
      parentCategoryId: "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (pictures.length <= 0) {
        toast.error("لطفا حداقل یک عکس انتخاب کنید");
        return;
      }

      // Delete pricename if not specified
      if (!values.priceName) {
        delete values.priceName;
      }
      await validationSchema.validate(values);

      // Check City
      if (!values.cityObject?.address?.city) {
        toast.error("لطفا یک شهر انتخاب کنید. ایالت یا استان مورد قبول نیست");
        return;
      }
      await createAd(values).then(async (id) => {
        // Upload ad pictures
        await uploadAdPictures(id);

        // Mutate user data to Update ads
        await mutate(process.env.NEXT_PUBLIC_CHECKAUTH_URL).then(() => {
          toast.success("آگهی شما با موفقیت ثبت شد");
          router.push("/account/ads");
        });
      });
    },
  });

  useEffect(() => {
    return () => clearPictures();
  }, []);

  return (
    <div className="mb-5 flex w-full max-w-lg flex-col items-center justify-center gap-y-2 px-2">
      <Pictures />
      <Input
        name="title"
        onChange={formik.handleChange}
        placeholder="عنوان آگهی"
      />
      <textarea
        name="description"
        onChange={formik.handleChange}
        placeholder="توضیحات آگهی"
      />
      <div className="my-5 flex w-full gap-x-1">
        {/* <SelectWithFetching
                    bordered
                    value={formik.values.countryId}
                    circleFlag
                    className='col-span-2'
                    route='/countries'
                    label='انتخاب کشور'
                    name='countryId'
                    setFieldValue={formik.setFieldValue}
                    formErrors={formik.errors}
                /> */}
        {/* <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} /> */}
        {/* <SelectCity
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
                /> */}
      </div>
      <div className="flex w-full gap-x-1">
        <Input
          name="price"
          onChange={formik.handleChange}
          placeholder="قیمت"
          type="number"
          className="w-1/2"
        />
        <Input
          name="priceName"
          onChange={formik.handleChange}
          placeholder="قیمت، ماهانه و.."
          type="text"
          className="w-1/2"
        />
      </div>

      <div className="mt-5 flex w-full gap-x-1">
        {/* <SelectWithFetching
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
                /> */}
      </div>

      <Button
        className="btn-primary mt-5 w-full"
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        ثبت آگهی
      </Button>
    </div>
  );
}
