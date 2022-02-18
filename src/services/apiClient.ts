import tokenManager from "./tokenManager";

import { ApiResponse } from "../config/api/apiResponses";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
  method: HttpMethod,
  url: string,
  body: any,
  withCredentials: boolean
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    "content-type": "application/json",
  };
  const authToken = tokenManager.retrieveToken();
  if (withCredentials && authToken != null) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw response;
  }
  return (await response.json()) as ApiResponse<T>;
}

async function get<T = void>(
  url: string,
  withCredentials = true
): Promise<ApiResponse<T>> {
  return request<T>("GET", url, {}, withCredentials);
}

async function post<T = void>(
  url: string,
  body: any,
  withCredentials = true
): Promise<ApiResponse<T>> {
  return request<T>("POST", url, body, withCredentials);
}

const apiClient = {
  get,
  post,
};

export default apiClient;
