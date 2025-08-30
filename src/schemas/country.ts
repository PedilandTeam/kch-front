import z from "zod";

export const CountrySchema = z.object({
  createdDate: z.string(),
  updateDate: z.string(),
  status: z.boolean(),
  availability: z.boolean(),
  id: z.number(),
  name: z.string(),
  code: z.string(),
  iso2: z.string(),
  iso3: z.string(),
  englishName: z.string(),
  areaCode: z.number(),
  currency: z.null(),
  currencyName: z.null(),
});

export type Country = z.infer<typeof CountrySchema>;
