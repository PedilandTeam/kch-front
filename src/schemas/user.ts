import z from "zod";
import { CitySchema } from "./city";
import { CountrySchema } from "./country";

const IUserSchema = z.object({
  ads: z.array(z.any()),
  authorized: z.boolean(),
  balance: z.number(),
  birthYear: z.number(),
  city: CitySchema,
  country: CountrySchema,
  createdDate: z.date(),
  currency: z.string(),
  currencyName: z.string(),
  email: z.string(),
  favoriteAdCategories: z.array(
    z.object({
      description: z.string(),
      id: z.number(),
      name: z.string(),
      parent: z.number(),
      slug: z.string(),
    }),
  ),
  firstname: z.string(),
  gender: z.string(),
  id: z.string(),
  immigrateMethods: z.array(
    z.object({ id: z.number(), title: z.string(), titleFa: z.string() }),
  ),
  immigrationCountries: z.array(CountrySchema),
  isImmigrate: z.boolean(),
  isVerified: z.boolean(),
  kch: z.number(),
  lastname: z.string(),
  level: z.number(),
  status: z.string(),
  username: z.string(),
});

const UserSchema = IUserSchema.extend({
  isActive: z.boolean(),
  ok: z.boolean(),
  user: IUserSchema,
});

export type User = z.infer<typeof UserSchema>;
