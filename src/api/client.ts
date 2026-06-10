import { authConfig } from '../utils/config';

const BASE_URL: string = authConfig.iam_base_url || '';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

async function request(
  path: string,
  { method = 'GET', headers = {}, body }: RequestOptions = {}
): Promise<unknown> {
  const url = `${BASE_URL}${path}`;

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(url, init);

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const data = isJson
    ? await res.json().catch(() => null)
    : await res.text();

  if (!res.ok) {
    const err: ApiError = new Error('Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (path: string, opts: RequestOptions = {}) =>
    request(path, { ...opts, method: 'GET' }),

  post: (path: string, body: unknown, opts: RequestOptions = {}) =>
    request(path, { ...opts, method: 'POST', body }),

  put: (path: string, body: unknown, opts: RequestOptions = {}) =>
    request(path, { ...opts, method: 'PUT', body }),

  patch: (path: string, body: unknown, opts: RequestOptions = {}) =>
    request(path, { ...opts, method: 'PATCH', body }),

  delete: (path: string, opts: RequestOptions = {}) =>
    request(path, { ...opts, method: 'DELETE' }),
};



export function dismissKeyboard(inputRef:any) {
    try {
        if (inputRef && inputRef.current && typeof inputRef.current.blur === 'function') {
            inputRef.current.blur();
        }
        const el:any = document.activeElement;
        if (el && typeof el.blur === 'function') {
            el.blur();
        }
    } catch (_) {
        // noop
    }
}