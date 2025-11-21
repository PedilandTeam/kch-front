type FetchWrapperResponse<T> = T | null;

export class FetchWrapperError {
  constructor(
    public isNotFound: boolean,
    public error: unknown,
    public isUnauthorized: boolean,
    public isServerError: boolean,
    public errorJson: any,
  ) {}
}

export type FetchWrapperConfig = {
  filters?: Record<string, any>;
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
): Promise<FetchWrapperResponse<T>> {
  const {
    filters = {},
    overrideUrl,
    revalidate,
    method = "GET",
    body,
    tags,
    headers,
  } = config;

  // --- Build URL ---
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const urlObj = new URL(overrideUrl ?? baseUrl);

  // Add query params
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      urlObj.searchParams.append(key, String(val));
    }
  });

  // --- Fetch config ---
  const fetchOptions: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    next: { revalidate, tags },
  };

  try {
    const res = await fetch(urlObj, fetchOptions);

    // Detect wrong content type (HTML from CF)
    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!isJson) {
      console.warn(
        `⚠ fetchWrapper: NON-JSON response from → ${urlObj.toString()}`,
      );
      return null;
    }

    const data = await res.json();

    if (res.ok) {
      return data as T;
    }

    // --- Handle known error types ---
    const error = new FetchWrapperError(
      res.status === 404,
      data,
      res.status === 401,
      res.status >= 500,
      data,
    );

    // DO NOT throw → graceful null fallback
    console.warn("⚠ fetchWrapper error:", error);
    return null;
  } catch (err) {
    // Network failure
    console.error(`❌ fetchWrapper network error: ${urlObj.toString()}`, err);
    return null;
  }
}
