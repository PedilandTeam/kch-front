type FetchWrapperResponse<T> = T;
// &
//  {
//   $: {
//     response?: Response | undefined;
//   };
// };

export class FetchWrapperError {
  isNotFound: boolean;
  error: unknown;
  isUnauthorized: boolean;
  isServerError: boolean;
  errorJson: any;
  constructor(
    isNotFound: boolean,
    error: unknown,
    isUnauthorized: boolean,
    isServerError: boolean,
    errorJson: any,
  ) {
    this.error = error;
    this.isNotFound = isNotFound;
    this.isUnauthorized = isUnauthorized;
    this.isServerError = isServerError;
    this.errorJson = errorJson;
  }
}

export type FetchWrapperConfig = {
  filters?: {
    [key: string]: any;
  };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  revalidate?: number;
  headers?: Record<string, string>;
  overrideUrl?: string;
  body?: any;
  tags?: string[];
};

export default async function fetchWrapper<T>(
  path: string,
  config: FetchWrapperConfig = {},
): Promise<FetchWrapperResponse<T> | null> {
  let {
    filters,
    overrideUrl,
    revalidate,
    method = "GET",
    body,
    tags,
    headers,
  } = config;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const urlObject = new URL(overrideUrl ? overrideUrl : url);

  if (!filters) filters = {};

  Object.keys(filters).forEach((filter) => {
    const value = filters![filter];
    if (value !== undefined && value !== null && value !== "") {
      urlObject.searchParams.append(filter, String(value));
    }
  });

  const fetchConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
    next: { revalidate, tags },
  };

  let isNotFound = false;
  let isUnauthorized = false;
  let isServerError = false;
  let errorJson: any = null;
  let isOk = false;
  let error: unknown = null;

  const fetcher = await fetch(urlObject, fetchConfig)
    .then(async (res) => {
      const contentType = res.headers.get("content-type") ?? "";

      // اگر خروجی JSON نبود → یعنی Cloudflare HTML داده → API خراب است
      if (!contentType.includes("application/json")) {
        console.warn("⚠ NON-JSON response detected:", urlObject.toString());
        isServerError = true;
        isOk = false;
        return null as any;
      }

      const resJson = await res.json();

      if (!res.ok) {
        if (res.status === 404) isNotFound = true;
        if (res.status === 401) isUnauthorized = true;
        if (res.status >= 500) isServerError = true;

        errorJson = resJson;
        isOk = false;
        return null as any;
      }

      isOk = true;
      return resJson;
    })
    .catch((err: unknown) => {
      console.warn("⚠ Network error:", urlObject.toString(), err);
      error = err;
      isOk = false;
      return null as any;
    });

  // بجای throw → graceful fallback
  if (isOk && !isServerError) {
    return fetcher;
  }

  return null;
}
