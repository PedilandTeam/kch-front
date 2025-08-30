import { z } from "zod";

export const MetaSchema = z.object({
  currentPage: z.number(),
  itemCount: z.number(),
  itemsPerPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
});

export type Meta = z.infer<typeof MetaSchema>;
