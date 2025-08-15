// src/lib/schemas/country.ts
import z from "zod";

export const CountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
});

export type Country = z.infer<typeof CountrySchema>;
