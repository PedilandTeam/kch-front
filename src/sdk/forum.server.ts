// src/sdk/forum.server.ts

import {
  Answer,
  AnswerSchema,
  QuestionSchema,
  QuestionsResponseSchema,
  type Question,
  type QuestionsResponse,
} from "@/lib/schemas/community";
import "server-only";

const API_URL = process.env.API_URL!;
if (!API_URL) throw new Error("Missing API_URL");

/**
 * Server-side fetch for questions (SSR/ISR).
 * Cached for 30s and tagged for precise invalidation.
 */
export async function fetchQuestionsServer(params: {
  limit?: number;
  page?: number;
}): Promise<QuestionsResponse> {
  const qs = new URLSearchParams({
    limit: String(params.limit ?? 30),
    page: String(params.page ?? 1),
  }).toString();

  const res = await fetch(`${API_URL}/forum/questions?${qs}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch questions: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();
  return QuestionsResponseSchema.parse(json);
}

export async function fetchQuestionServer(params: {
  id: string;
}): Promise<Question> {
  const res = await fetch(`${API_URL}/forum/questions/${params.id}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch question: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();
  return QuestionSchema.parse(json);
}

export async function fetchAnswersServer(params: {
  questionId: string;
  countryCode: string;
  page?: number;
  limit?: number;
}): Promise<Answer[]> {
  const qs = new URLSearchParams({
    questionId: params.questionId,
    countryCode: params.countryCode,
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 30),
  }).toString();

  const res = await fetch(`${API_URL}/forum/answers?${qs}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch answers: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();
  return AnswerSchema.array().parse(json);
}
