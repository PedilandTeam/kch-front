import { z } from "zod";

const baseSchema = {
  gender: z.enum(["male", "female", "other"]).optional(),
  birthYear: z
    .string()
    .regex(/^\d{4}$/, "سال تولد باید ۴ رقمی باشد")
    .refine((val) => {
      const year = Number(val);
      return year >= 1925 && year <= 2007;
    }, "سال تولد باید بین 1925 تا 2007 باشد")
    .optional(),
  city: z.string().optional(),
};

export const adsClubRegisterSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("migrated"),
    country: z.string().min(1, "تعیین کشور الزامی است."),
    interests: z.array(z.string()).min(1, "حداقل یک مورد انتخاب کنید."),
    destinations: z.array(z.string()).optional(),
    methods: z.array(z.string()).optional(),
    ...baseSchema,
  }),
  z.object({
    status: z.literal("migrating"),
    destinations: z.array(z.string()).min(1, "حداقل یک مورد انتخاب کنید."),
    methods: z.array(z.string()).min(1, "حداقل یک مورد انتخاب کنید."),
    country: z.string().optional(),
    interests: z.array(z.string()).optional(),
    ...baseSchema,
  }),
]);

export type AdsClubRegisterSchema = z.infer<typeof adsClubRegisterSchema>;
