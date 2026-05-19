import { getAccessToken, ensureFreshToken } from '@tokens';

/* ============================================================
   Конфиг окружения
============================================================ */

export const BASE_URL = import.meta.env.DEV
    ? 'http://localhost:4091'
    : '/api';
//export const BASE_URL = '/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends RequestInit {
    skipAuth?: boolean;
    skipJsonContentType?: boolean;
    responseType?: 'json' | 'blob'; // 👈 ВАЖНО
    _retry?: boolean;
}

/* ============================================================
   Refresh mutex + очередь
============================================================ */

let isRefreshing = false;
let queue: Array<() => void> = [];

const enqueue = (cb: () => void) => queue.push(cb);
const flush = () => {
    queue.forEach(cb => cb());
    queue = [];
};

/* ============================================================
   Низкоуровневый fetch
============================================================ */

async function fetchRaw<T>(
    url: string,
    method: HttpMethod,
    data?: unknown,
    config: RequestConfig = {}
): Promise<T> {
    const headers = new Headers(config.headers || {});

    // Добавляем JSON Content-Type ТОЛЬКО если явно не запретили
    if (!config.skipJsonContentType && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // Подставляем accessToken
    if (!config.skipAuth) {
        const token = getAccessToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    let body: any;

    if (config.skipJsonContentType) {
        body = data;
    } else {
        body = data ? JSON.stringify(data) : undefined;
    }

    const res = await fetch(`${BASE_URL}${url}`, {
        method,
        body,
        credentials: import.meta.env.DEV ? 'include' : 'same-origin',
        ...config,
        headers,
    });

    // ===== 401 → refresh (ТОЛЬКО 1 РАЗ) =====
    if (res.status === 401 && !config.skipAuth) {
        if (config._retry) {
            // ❌ уже делали refresh для этого запроса
            throw new Error('Unauthorized');
        }

        return handle401<T>(url, method, data, {
            ...config,
            _retry: true,
        });
    }

    // ===== обычный ответ =====
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    if (config.responseType === 'blob') {
        return (await res.blob()) as T;
    }

    return res.json() as Promise<T>;
}

/* ============================================================
   401 + refresh + retry (1 в 1 axios interceptor)
============================================================ */

async function handle401<T>(
    url: string,
    method: HttpMethod,
    data?: unknown,
    config: RequestConfig = {}
): Promise<T> {
    // Если refresh уже идёт — ставим в очередь
    if (isRefreshing) {
        return new Promise<T>((resolve, reject) => {
            enqueue(() => {
                fetchRaw<T>(url, method, data, config)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }

    isRefreshing = true;

    try {
        const fresh = await ensureFreshToken();

        if (!fresh) {
            // ❌ refresh failed → стоп
            throw new Error('Refresh failed');
        }

        flush();

        // 🔁 повторяем ИСХОДНЫЙ запрос
        return fetchRaw<T>(url, method, data, config);
    } finally {
        isRefreshing = false;
    }
}

/* ============================================================
   Универсальный helper (как в axios-версии)
============================================================ */

async function request<T>(
    fn: () => Promise<T>
): Promise<T | false> {
    try {
        return await fn();
    } catch(e) {
        console.error(e)
        return false;
    }
}

/* ============================================================
   Публичный API (1 в 1 как axios)
============================================================ */

export const apiTypes = {
    get: <T>(url: string, config?: RequestConfig) =>
        request<T>(() => fetchRaw<T>(url, 'GET', undefined, config)),

    post: <T>(url: string, data?: unknown, config?: RequestConfig) =>
        request<T>(() => fetchRaw<T>(url, 'POST', data, config)),

    put: <T>(url: string, data?: unknown, config?: RequestConfig) =>
        request<T>(() => fetchRaw<T>(url, 'PUT', data, config)),

    patch: <T>(url: string, data?: unknown, config?: RequestConfig) =>
        request<T>(() => fetchRaw<T>(url, 'PATCH', data, config)),

    delete: <T>(url: string, config?: RequestConfig) =>
        request<T>(() => fetchRaw<T>(url, 'DELETE', undefined, config)),
};

export default apiTypes;

export function buildUrl(url: string, filters: any): string {
    // Создаем экземпляр URLSearchParams
    const params = new URLSearchParams();

    // Перебираем только те поля filters, у которых значение не undefined
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            // приводим значение к строке
            params.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
        }
    });

    // Получаем готовую строку запроса
    return `${url}?${params.toString()}`;
}