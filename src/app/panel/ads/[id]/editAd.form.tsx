"use client";

import { useEffect } from "react";
import Pictures from "../components/pictures";
import { axiosFetcher } from "@/hooks/axiosFetcher";
import useAdPicture from "@/store/useAdPicture";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import DeleteAdModal from "../components/deleteAd.modal";
import useAdManagement from "../hooks/useAdManagement";
import useUploadAdPictures from "../hooks/useUploadAdPictures";
import { Button, Input } from "@/components/ui";

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

// export default function EditAdForm() {
//   // const {createAd, createAdLoading} = useCreateAd()
//   const router = useRouter();

//   const { updateAd, updateAdLoading } = useAdManagement();
//   const { uploadAdPictures, uploadAdPicturesLoading } = useUploadAdPictures();

//   const params = useParams();
//   const adId = params.id as string;
//   const { clearPictures, pictures } = useAdPicture();
//   const {
//     data: ad,
//     isLoading: adLoading,
//     error: adError,
//   } = useSWR(
//     `${process.env.NEXT_PUBLIC_API_URL}/ads/${params.id as string}`,
//     axiosFetcher,
//   );

//   useEffect(() => {
//     if (!adError) return;
//     if (adError?.statusCode == 404) {
//       toast.error("آگهی مورد نظر یافت نشد");
//       router.push("/account/ads");
//       return;
//     } else {
//       toast.error(adError?.message || "خطایی در دریافت اطلاعات رخ داده است");
//       router.push("/account/ads");
//     }
//   }, [adError]);

//   const validationSchema = Yup.object().shape({
//     countryId: Yup.string().required("لطفا کشور محل سکونت را انتخاب کنید"),
//     cityObject: Yup.object().notRequired(),
//     title: Yup.string().required("لطفا عنوان آگهی را وارد کنید"),
//     description: Yup.string().required("لطفا توضیحات آگهی را وارد کنید"),
//     price: Yup.string(),
//     priceName: Yup.string().notRequired(),
//     parentCategoryId: Yup.string().required(
//       "لطفا دسته بندی اصلی را انتخاب کنید",
//     ),
//     categoryId: Yup.string().required("لطفا دسته بندی را انتخاب کنید"),
//   });

//   const formik = useFormik<EditAdForm>({
//     initialValues: {
//       id: "",
//       countryId: "",
//       cityObject: {},
//       title: "",
//       description: "",
//       price: "",
//       priceName: "",
//       categoryId: "",
//       parentCategoryId: "",
//     },
//     validationSchema,
//     validateOnBlur: false,
//     validateOnChange: false,
//     validateOnMount: false,
//     onSubmit: async (values) => {
//       // Delete pricename if not specified
//       if (!values.priceName) {
//         delete values.priceName;
//       }
//       await validationSchema.validate(values);
//       // Check City
//       if (values.cityObject) {
//         if (!values.cityObject?.address?.city) {
//           toast.error("لطفا یک شهر انتخاب کنید. ایالت یا استان مورد قبول نیست");
//           return;
//         }
//       }
//       await updateAd(adId, values).then(async () => {
//         // Upload ad pictures if new pictures added
//         if (pictures.length > 0) await uploadAdPictures(adId);

//         // Mutate user data to Update ads
//         await mutate(process.env.NEXT_PUBLIC_CHECKAUTH_URL).then(() => {
//           toast.success("آگهی شما با موفقیت ثبت شد");
//           router.push("/account/ads");

//           // Clear pictures
//           clearPictures();
//         });
//       });
//     },
//   });

//   useEffect(() => {
//     if (params.id && formik && ad) {
//       formik.setValues({
//         title: ad.title,
//         description: ad.description,
//         price: ad.price,
//         priceName: ad.priceName,
//         parentCategoryId: ad.category?.parent?.id,
//         categoryId: ad.category.id,
//         id: ad.id,
//         countryId: ad.country.id,
//         cityObject: undefined,
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ad, params.id]);

//   useEffect(() => {
//     return () => clearPictures();
//   }, []);

//   if (ad)
//     return (
//       <div className="mb-5 flex w-full max-w-lg flex-col items-center justify-center gap-y-2 px-2">
//         <Pictures
//           currentPicturesPath={ad?.pictures}
//           adId={params.id as string}
//         />
//         <Input
//           name="title"
//           onChange={formik.handleChange}
//           placeholder="عنوان آگهی"
//           defaultValue={formik.values.title}
//         />
//         <textarea
//           name="description"
//           onChange={formik.handleChange}
//           placeholder="توضیحات آگهی"
//           defaultValue={formik.values.description}
//         />
//         <div className="flex w-full gap-x-1">
//           <Input
//             name="price"
//             onChange={formik.handleChange}
//             placeholder="قیمت"
//             type="number"
//             className="w-1/2"
//             defaultValue={formik.values.price}
//           />
//           <Input
//             name="priceName"
//             onChange={formik.handleChange}
//             placeholder="قیمت، ماهانه و.."
//             type="text"
//             className="w-1/2"
//             defaultValue={formik.values.priceName}
//           />
//         </div>
//         <div className="mt-5 flex w-full gap-x-1">
//           {/* <SelectWithFetching
//             bordered
//             value={formik.values.countryId}
//             circleFlag
//             className="col-span-2"
//             route="/countries"
//             label="انتخاب کشور"
//             name="countryId"
//             setFieldValue={formik.setFieldValue}
//             formErrors={formik.errors}
//             defaultValue={formik.values.countryId}
//           /> */}
//           {/* <SelectWithFetching bordered value={formik.values.countryId} circleFlag className="col-span-2" route="/countries" label="انتخاب کشور" name="countryId" setFieldValue={formik.setFieldValue} formErrors={formik.errors} /> */}
//           {/* <SelectCity
//             bordered
//             value={formik.values.cityObject}
//             className="col-span-2"
//             label={ad?.city?.name ? ad?.city?.name : "انتخاب شهر"}
//             name="cityObject"
//             isDisabled={!formik.values?.countryId}
//             paginated
//             setFieldValue={formik.setFieldValue}
//             formErrors={formik.errors}
//             searchAble
//             infiniteScroll
//             defaultValue={ad?.city?.name}
//           /> */}
//         </div>

//         <div className="mt-5 flex w-full gap-x-1">
//           {/* <SelectWithFetching
//             bordered
//             value={formik.values.parentCategoryId}
//             className="col-span-2"
//             route="/ad-categories?justMain=true"
//             label="دسته‌بندی اصلی"
//             name="parentCategoryId"
//             setFieldValue={formik.setFieldValue}
//             formErrors={formik.errors}
//             defaultValue={formik.values.parentCategoryId}
//           />
//           <SelectWithFetching
//             bordered
//             value={formik.values.categoryId}
//             className="col-span-2"
//             route={
//               formik.values?.parentCategoryId
//                 ? `/ad-categories?parentId=${formik.values?.parentCategoryId}`
//                 : ""
//             }
//             label="دسته بندی"
//             name="categoryId"
//             isDisabled={!formik.values?.parentCategoryId}
//             setFieldValue={formik.setFieldValue}
//             formErrors={formik.errors}
//             defaultValue={formik.values.categoryId}
//           /> */}
//         </div>

//         <DeleteAdModal adId={adId} />

//         <div className="flex w-full items-center justify-center gap-x-1">
//           <label
//             htmlFor="delete_ad_modal"
//             className="btn btn-ghost mt-5 w-3/12 hover:bg-red-500 hover:text-white"
//           >
//             حذف اگهی
//           </label>
//           <Button
//             className="btn-primary mt-5 w-9/12"
//             onClick={() => {
//               formik.handleSubmit();
//             }}
//           >
//             آپدیت آگهی
//           </Button>
//         </div>
//       </div>
//     );
// }
