export namespace UserCheckNamespace {
  export type GET = {
    type: string; // 'cors', 'basic', etc.
    url: string; // The URL of the request
    redirected: boolean; // Indicates if the response was redirected
    status: number; // HTTP status code (e.g., 200)
    ok: boolean; // Indicates if the response was successful (status in the range 200-299)
    bodyUsed: boolean; // Indicates if the body has been used
    headers: Headers; // The headers of the response
    statusText: string;
  };
}
