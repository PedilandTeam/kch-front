import z from "zod";

export const adsClubSchema = z.object({
  status: z.enum(["migrated", "migrating"]),
  gender: z.enum(["male", "female", "other"]).optional(),
  birthYear: z.string().optional(),

  country: z.string().optional(),
  city: z.string().optional(),
  interests: z.array(z.string()).optional(),
  destinations: z.array(z.string()).optional(),
  methods: z.array(z.string()).optional(),
});
