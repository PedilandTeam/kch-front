export const swrKeys = {
  countries: (filters?: { status?: boolean; code?: string }) =>
    ["countries", { status: filters?.status, code: filters?.code }] as const,

  country: (id: number) => ["country", id] as const,

  questions: (params: {
    limit: number;
    page: number;
    countryCode?: string;
    search?: string;
    topicId?: string;
  }) => ["questions", params] as const,

  question: (id: number) => ["question", id] as const,
};
