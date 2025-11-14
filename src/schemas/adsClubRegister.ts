import z from "zod";

export const adsClubSchema = z
  .object({
    isImmigrate: z
      .boolean()
      .optional()
      .refine((val) => val !== undefined, {
        message: "وضعیت مهاجرت را انتخاب کنید.",
      }),

    gender: z.enum(["male", "female", "other"]).optional(),
    birthYear: z.string().optional(),

    countryId: z.number().optional(),
    cityId: z.number().optional(),

    favoriteAdCategoryIds: z.array(z.number()).optional(),

    immigrationCountryIds: z.array(z.number()).optional(),
    immigrateMethodIds: z.array(z.number()).optional(),
  })

  // 🟦 اگر مهاجرت کرده → کشور الزامی
  .refine(
    (d) =>
      d.isImmigrate === false || // ← در حال مهاجرت
      (d.countryId !== undefined && d.countryId > 0), // ← مهاجرت کرده
    {
      message: "کشور محل زندگی را انتخاب کنید.",
      path: ["countryId"],
    },
  )

  // 🟦 اگر مهاجرت کرده → شهر فقط وقتی لازم است که کشور انتخاب شده باشد
  .refine(
    (d) =>
      d.isImmigrate === false || // اگر در حال مهاجرت است → شهر لازم نیست
      d.countryId === undefined || // اگر کشور انتخاب نشده → شهر لازم نیست
      (d.cityId !== undefined && d.cityId > 0), // اگر کشور انتخاب شده → شهر لازم است
    {
      message: "شهر محل سکونت را انتخاب کنید.",
      path: ["cityId"],
    },
  )

  // 🟦 اگر مهاجرت کرده → علاقه‌مندی‌ها الزامی
  .refine(
    (d) =>
      d.isImmigrate === false ||
      (d.favoriteAdCategoryIds && d.favoriteAdCategoryIds.length > 0),
    {
      message: "حداقل یک موضوع مورد علاقه انتخاب کنید.",
      path: ["favoriteAdCategoryIds"],
    },
  )

  // 🟩 اگر در حال مهاجرت → کشورها الزامی
  .refine(
    (d) =>
      d.isImmigrate === true ||
      (d.immigrationCountryIds && d.immigrationCountryIds.length > 0),
    {
      message: "کشورهای موردنظر را انتخاب کنید.",
      path: ["immigrationCountryIds"],
    },
  )

  // 🟩 اگر در حال مهاجرت → روش‌ها الزامی
  .refine(
    (d) =>
      d.isImmigrate === true ||
      (d.immigrateMethodIds && d.immigrateMethodIds.length > 0),
    {
      message: "حداقل یک روش مهاجرت را انتخاب کنید.",
      path: ["immigrateMethodIds"],
    },
  );
