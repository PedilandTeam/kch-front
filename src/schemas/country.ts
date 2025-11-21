import z from "zod";

export const CountrySchema = z.object({
  areaCode: z.number(),
  availability: z.boolean(),
  code: z.string(),
  createdDate: z.string(),
  currency: z.null(),
  currencyName: z.null(),
  englishName: z.string(),
  id: z.number(),
  iso2: z.string(),
  iso3: z.string(),
  name: z.string(),
  pageCount: z.string(),
  status: z.boolean(),
  updateDate: z.string(),
});

export type Country = z.infer<typeof CountrySchema>;
