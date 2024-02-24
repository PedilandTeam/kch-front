
export const fetcher = (
    ...args: [RequestInfo] | [URL, init?: RequestInit] | any[]
) => fetch(...args).then((res) => res.json());
