type FetchWrapperResponse<T> = T
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
    errorJson: any
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
  overrideUrl?: string;
  body?: any;
  tags?: string[];
};
export default async function fetchWrapper<T>(
  path: string,
  config: FetchWrapperConfig = {}
): Promise<FetchWrapperResponse<T>> {
  let { filters, overrideUrl, revalidate, method = 'GET', body, tags } = config;
  const url = `${process.env.API_URL}/${path}`;
  const urlObject = new URL(overrideUrl ? overrideUrl : url);

  if (!filters) {
    filters = {};
  }

  if (filters) {
    Object.keys(filters).forEach((filter) => {
      const value = filters![filter];
      if (value !== undefined && value !== null && value !== '') {
        urlObject.searchParams.append(filter, String(value));
      }
    });
  }

  // Debug logging for pages endpoint
  if (path === 'pages') {
    console.log("🔍 FetchWrapper URL:", urlObject.toString());
    console.log("🔍 FetchWrapper filters:", filters);
  }

  const fetchConfig: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
    next: { revalidate, tags },
  };

  // let response: Response | undefined = undefined;
  let error: unknown;
  let isNotFound: boolean = false;
  let isUnAuthorized: boolean = false;
  let isServerError: boolean = false;
  let isOk = false;
  let errorJson: any = null;
  const fetcher: FetchWrapperResponse<T> = await fetch(urlObject, fetchConfig)
    .then(async (res) => {

      const resJson = await res.json()

      if (!res.ok) {
        if (res.status === 404) {
          isNotFound = true;
        }

        if (res.status === 401) {
          isUnAuthorized = true;
        }

        if (res.status === 500) {
          isServerError = true;
        }

        errorJson = resJson
      }
      isOk = true;
      return resJson;
    })
    .catch((err: unknown) => {
      error = err;
      if (err instanceof Error) {
        if (typeof window === "undefined") {
          console.error(urlObject.toString(), err);
        }
      }
        console.error(urlObject.toString(), err);
      
    });
  if (isOk) {
    return fetcher;
  } else {
    throw new FetchWrapperError(
      isNotFound,
      error,
      isUnAuthorized,
      isServerError,
      errorJson,
    );
  }
}
