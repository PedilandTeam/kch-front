import z from "zod";
import { CitySchema } from "./city";
import { CountrySchema } from "./country";

export const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  level: z.number(),
});

export const IUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  firstname: z.string(),
  lastname: z.string(),
  country: CountrySchema,
  city: CitySchema,
  ads: z.array(z.any()),
  lastAd: z.date().nullable(),
  balance: z.number(),
  currency: z.string(),
  currencyName: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type IUser = z.infer<typeof IUserSchema>;
