// src/lib/schemas/community.ts
import { z } from "zod";
import { MetaSchema } from "./meta";
import { UserSchema } from "./user";
import { CountrySchema } from "./country";

export const AnswerSchema = z.object({
  id: z.string(),
  status: z.boolean().optional(),
  createdDate: z.string(),
  updateDate: z.string(),
  isGreen: z.boolean().optional(),
  text: z.string().optional(),

  question: z
    .object({
      id: z.string(),
      title: z.string().optional(),
      text: z.string().optional(),
      createdDate: z.string(),
      updateDate: z.string(),
      status: z.boolean().optional(),
      topic: z
        .object({
          title: z.string().optional(),
        })
        .optional(),
      country: CountrySchema.optional(),
      user: UserSchema.optional().nullable(),
      votes: z
        .array(
          z.object({
            type: z.enum(["up", "down"]),
          }),
        )
        .optional()
        .default([]),
    })
    .optional()
    .nullable(),

  votes: z
    .array(
      z.object({
        type: z.enum(["up", "down"]),
      }),
    )
    .optional()
    .default([]),

  user: UserSchema.optional().nullable(),
  botUser: UserSchema.optional().nullable(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  text: z.string().optional(),
  createdDate: z.string(),
  updateDate: z.string(),
  status: z.boolean().optional(),

  topic: z
    .object({
      title: z.string().optional(),
    })
    .optional(),

  country: CountrySchema.optional(),
  user: UserSchema.optional().nullable(),

  votes: z
    .array(
      z.object({
        type: z.enum(["up", "down"]),
      }),
    )
    .optional()
    .default([]),

  answers: z.array(AnswerSchema).optional().default([]),
});

export const QuestionsResponseSchema = z.object({
  items: z.array(QuestionSchema),
  meta: MetaSchema,
});

export type Answer = z.infer<typeof AnswerSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type QuestionsResponse = z.infer<typeof QuestionsResponseSchema>;
