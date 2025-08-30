import z from "zod";
import { CountrySchema } from "./country";
import { MetaSchema } from "./meta";

export const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  country: CountrySchema,
  englishName: z.string().optional(),
});

export const GetCitiesResponseSchema = z.object({
  items: z.array(CitySchema),
  meta: MetaSchema,
});

export type City = z.infer<typeof CitySchema>;
export type GetCitiesResponse = z.infer<typeof GetCitiesResponseSchema>;
