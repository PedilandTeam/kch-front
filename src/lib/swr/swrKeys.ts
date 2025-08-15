// src/lib/swr/swrKeys.ts
// Centralized SWR key builders to avoid typos and keep keys stable

export const swrKeys = {
  /**
   * Unique key for the questions list endpoint.
   * Keep page/limit in the key if you support pagination.
   */
  questions: (p: { countryCode: string; limit?: number; page?: number }) =>
    `/api/forum/questions?countryCode=${encodeURIComponent(p.countryCode)}&page=${p.page ?? 1}&limit=${p.limit ?? 30}`,

  question: (p: { questionId: string; countryCode: string }) =>
    `/api/forum/questions/${encodeURIComponent(p.questionId)}`,

  answers: (p: {
    topicId: string;
    questionId: string;
    limit?: number;
    page?: number;
  }) =>
    `/api/forum/answers?topicId=${encodeURIComponent(p.topicId)}&questionId=${encodeURIComponent(p.questionId)}&page=${p.page ?? 1}&limit=${p.limit ?? 30}`,
};
