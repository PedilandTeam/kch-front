// src/lib/schemas/user.ts
import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  level: z.number(),
});

export type User = z.infer<typeof UserSchema>;
