import type { z } from "zod";
import type { Country } from "@/schemas/country";
import type { City } from "@/schemas/city";
import type { UserSchema } from "@/schemas/user";

export type IUser = z.infer<typeof UserSchema>["user"] & {
  emailVerified?: boolean;
  city?: City;
  country?: Country;
};