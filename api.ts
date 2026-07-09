const API_BASE = (window as any).__API_BASE__ ?? 'http://localhost:3001';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || `Request failed: ${res.status}`);
    }

    return res.json();
  }

  register(email: string, password: string) {
    return this.request<{ accessToken: string }>('POST', '/auth/register', { email, password });
  }

  login(email: string, password: string) {
    return this.request<{ accessToken: string }>('POST', '/auth/login', { email, password });
  }

  createSession(mode: string, durationSeconds: number) {
    return this.request<{ id: string }>('POST', '/sessions', { mode, durationSeconds });
  }

  getSessions() {
    return this.request<Array<{ id: string; mode: string; durationSeconds: number; completedAt: string }>>('GET', '/sessions');
  }
}

export const api = new ApiClient();
