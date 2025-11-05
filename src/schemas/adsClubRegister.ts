import { z } from "zod";

/* ────────────────────────────────
 * ✅ مرحله اول (Step 1)
 * ──────────────────────────────── */
export const adsClubStep1Schema = z.object({
  status: z
    .enum(["migrated", "migrating"], {
      message: "انتخاب وضعیت الزامی است.",
    })
    .refine((val) => !!val, "انتخاب وضعیت الزامی است."),
  gender: z
    .enum(["male", "female", "other"], {
      message: "انتخاب جنسیت الزامی است.",
    })
    .optional(),
  birthYear: z
    .union([
      z.literal(""),
      z
        .string()
        .regex(/^\d{4}$/, "سال تولد باید ۴ رقمی باشد")
        .refine(
          (val) => {
            const year = Number(val);
            return year >= 1925 && year <= 2007;
          },
          { message: "سال تولد باید بین 1925 تا 2007 باشد" },
        ),
    ])
    .optional(),
});

export type AdsClubStep1 = z.infer<typeof adsClubStep1Schema>;

/* ────────────────────────────────
 * ✅ مرحله دوم (Step 2)
 * ──────────────────────────────── */

const baseSchema = {
  gender: z.enum(["male", "female", "other"]).optional(),
  birthYear: z
    .union([
      z.literal(""),
      z
        .string()
        .regex(/^\d{4}$/, "سال تولد باید ۴ رقمی باشد")
        .refine(
          (val) => {
            const year = Number(val);
            return year >= 1925 && year <= 2007;
          },
          { message: "سال تولد باید بین 1925 تا 2007 باشد" },
        ),
    ])
    .optional(),
  city: z.string().optional(),
};

export const adsClubStep2Schema = z.discriminatedUnion("status", [
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

export type AdsClubStep2 = z.infer<typeof adsClubStep2Schema>;

/* ────────────────────────────────
 * ✅ ترکیب نهایی
 * ──────────────────────────────── */
export const adsClubRegisterSchema = adsClubStep2Schema;
export type AdsClubRegister = z.infer<typeof adsClubRegisterSchema>;
