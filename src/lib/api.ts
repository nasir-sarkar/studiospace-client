import { authClient } from "./auth-client";

const API_BASE = "/server-api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const syncSession = async () => {
  const { data } = await authClient.token();
  if (!data?.token) {
    return false;
  }

  const res = await fetch(`${API_BASE}/auth/session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: data.token }),
  });
  return res.ok;
};

export const clearServerSession = async () => {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 401 && retry && (await syncSession())) {
    return apiFetch<T>(path, options, false);
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      data?.msg || "Something went wrong. Please try again.",
      res.status,
    );
  }

  return data as T;
};
