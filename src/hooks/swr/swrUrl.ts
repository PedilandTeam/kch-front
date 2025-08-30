// ns: namespace
// qs: query string

export function keyToUrl(key: readonly unknown[]) {
  const [ns, payload] = key as [string, any];

  switch (ns) {
    case "countries": {
      const params = new URLSearchParams();
      if (payload?.status !== undefined)
        params.set("status", String(payload.status));
      if (payload?.code) params.set("code", payload.code);
      const qs = params.toString();
      return `/countries${qs ? `?${qs}` : ""}`;
    }

    case "questions": {
      const params = new URLSearchParams();

      params.set("limit", String(payload.limit));
      params.set("page", String(payload.page));

      if (payload?.countryCode) params.set("countryCode", payload.countryCode);
      if (payload?.search) params.set("search", payload.search);
      if (payload?.topicId) params.set("topicId", payload.topicId);

      const qs = params.toString();
      return `/forum/questions${qs ? `?${qs}` : ""}`;
    }

    case "question": {
      return `/forum/questions/${payload}`;
    }

    default:
      throw new Error(`Unknown namespace: ${ns}`);
  }
}
