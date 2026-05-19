// auth/tokenManager.ts

import api from "@api";

let accessToken: string | null = null;
// было: let refreshInFlight: Promise<string> | null = null;
let refreshInFlight: Promise<string | null> | null = null;

export const getAccessToken = () => accessToken;

export function setAccessToken(token: string | null) {
    accessToken = token;
}

async function requestNewAccessToken(): Promise<string | null> {
    const res = await api.post<{accessToken: string}>('/refresh', null, {skipAuth: true});
    return res ? res.accessToken : null;
}

export async function ensureFreshToken(): Promise<string | null> {
    // теперь тип совпадает с сигнатурой функции
    if (refreshInFlight) return refreshInFlight;

    refreshInFlight = (async () => {
        try {
            const t = await requestNewAccessToken();
            setAccessToken(t);
            return t;                // string
        } catch {
            setAccessToken(null);
            return null;             // null
        } finally {
            refreshInFlight = null;  // сбрасываем флаг
        }
    })();

    return refreshInFlight;
}