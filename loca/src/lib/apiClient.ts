const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://192.168.164.130:8080";

type RequestOptions = RequestInit & {
  fallback?: unknown;
};

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    if ("fallback" in options) return options.fallback as T;
    throw new Error("API base URL is not configured.");
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    if ("fallback" in options) return options.fallback as T;
    throw new Error("현재 서버에 연결할 수 없습니다. Mock 데이터로 표시합니다.");
  }

  if (!response.ok) {
    const message = response.status === 409 ? "이미 등록된 데이터입니다." : "요청 처리 중 문제가 발생했습니다.";
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
