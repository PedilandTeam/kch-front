// src/swr/axiosFetcher.tsx
import axios, { AxiosRequestConfig } from "axios";

export const axiosFetcher = async (url: string) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Check if the error has a response object
      if (err.response) {
        // Attempt to use the response data or default to a generic message
        const errorMessage =
          err.response.data ||
          JSON.stringify(err.response.data) ||
          "An error occurred";
        throw errorMessage;
      } else if (err.request) {
        // The request was made but no response was received
        throw new Error("No response was received");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error setting up the request");
      }
    } else {
      // Throw if the error is not an AxiosError (less likely to happen)
      throw new Error("An unexpected error occurred");
    }
  }
};
