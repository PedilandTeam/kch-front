import { z } from "zod";

export const adsClubSchema = z
  .object({
    isImmigrate: z.boolean(),

    gender: z.string().nullable().optional(),

    birthYear: z.union([z.number(), z.string()]).nullable().optional(),

    countryId: z
      .number({
        required_error: "کشور محل زندگی را انتخاب کنید.",
        invalid_type_error: "کشور محل زندگی را انتخاب کنید.",
      })
      .int()
      .positive("کشور محل زندگی را انتخاب کنید.")
      .optional(),

    cityId: z
      .number({
        required_error: "شهر محل سکونت را انتخاب کنید.",
        invalid_type_error: "شهر محل سکونت را انتخاب کنید.",
      })
      .int()
      .positive("شهر محل سکونت را انتخاب کنید.")
      .optional(),

    favoriteAdCategoryIds: z.array(z.number()).optional(),

    immigrationCountryIds: z.array(z.number()).optional(),

    immigrateMethodIds: z.array(z.number()).optional(),
  })
  .refine((data) => !(data.isImmigrate === true && !data.countryId), {
    message: "کشور محل زندگی را انتخاب کنید.",
    path: ["countryId"],
  })
  .refine(
    (data) => !(data.isImmigrate === true && data.countryId && !data.cityId),
    {
      message: "شهر محل سکونت را انتخاب کنید.",
      path: ["cityId"],
    },
  )
  .refine(
    (data) =>
      !(
        data.isImmigrate === true &&
        (!data.favoriteAdCategoryIds || data.favoriteAdCategoryIds.length === 0)
      ),
    {
      message: "حداقل یک مورد را انتخاب کنید.",
      path: ["favoriteAdCategoryIds"],
    },
  )
  .refine(
    (data) =>
      !(
        data.isImmigrate === false &&
        (!data.immigrationCountryIds || data.immigrationCountryIds.length === 0)
      ),
    {
      message: "حداقل یک کشور را انتخاب کنید.",
      path: ["immigrationCountryIds"],
    },
  )
  .refine(
    (data) =>
      !(
        data.isImmigrate === false &&
        (!data.immigrateMethodIds || data.immigrateMethodIds.length === 0)
      ),
    {
      message: "حداقل یک روش مهاجرت را انتخاب کنید.",
      path: ["immigrateMethodIds"],
    },
  );
