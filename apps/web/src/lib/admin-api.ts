const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const adminAuth = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("1aset_admin_token");
  },

  getUser(): any | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("1aset_admin_user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setSession(token: string, user: any) {
    if (typeof window === "undefined") return;
    localStorage.setItem("1aset_admin_token", token);
    localStorage.setItem("1aset_admin_user", JSON.stringify(user));
  },

  clearSession() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("1aset_admin_token");
    localStorage.removeItem("1aset_admin_user");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = adminAuth.getToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      adminAuth.clearSession();
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login?expired=1";
      }
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}
