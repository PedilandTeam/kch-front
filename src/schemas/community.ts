import { z } from "zod";
import { CountrySchema } from "./country";
import { MetaSchema } from "./meta";
import { UserSchema } from "./user";

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
});

export const VoteSchema = z.object({
  createdDate: z.string(),
  updateDate: z.string(),
  id: z.string(),
  type: z.string(),
});

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
      topic: TopicSchema.optional(),
      country: CountrySchema.optional(),
      user: UserSchema.optional().nullable(),
      votes: z.array(VoteSchema).optional().default([]),
    })
    .optional()
    .nullable(),

  votes: z.array(VoteSchema).optional().default([]),

  user: UserSchema.optional().nullable(),
  botUser: UserSchema.optional().nullable(),
});

export const QuestionSchema = z.object({
  createdDate: z.string(),
  updateDate: z.string(),
  status: z.boolean().optional(),
  id: z.string(),
  title: z.string().optional(),
  text: z.string().optional(),
  answers: z.array(AnswerSchema).optional().default([]),
  topic: TopicSchema.optional(),
  botUser: UserSchema.optional().nullable(),
  user: UserSchema.optional().nullable(),
  votes: z.array(VoteSchema).optional().default([]),
  country: CountrySchema.optional(),
});

export const QuestionsResponseSchema = z.object({
  items: z.array(QuestionSchema),
  meta: MetaSchema,
});

export const AnswersResponseSchema = z.object({
  items: z.array(AnswerSchema),
  meta: MetaSchema,
});

export type Question = z.infer<typeof QuestionSchema>;
export type GetQuestionsResponse = z.infer<typeof QuestionsResponseSchema>;

export type Answer = z.infer<typeof AnswerSchema>;
export type GetAnswersResponse = z.infer<typeof AnswersResponseSchema>;
