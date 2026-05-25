import api from "@api";

type AvatarSizeOptions = {
    w?: number;
    h?: number;
    q?: number; // quality 1–100
};

export async function apiImageBlob(
    avatar: string,
    options: AvatarSizeOptions = {}
): Promise<string | null> {
    try {
        const params = new URLSearchParams();

        if (options.w) params.append('w', String(options.w));
        if (options.h) params.append('h', String(options.h));
        if (options.q) params.append('q', String(options.q));

        const query = params.toString();
        const url = `/image/${avatar}${query ? `?${query}` : ''}`;

        const blob = await api.get<Blob>(url, {
            skipJsonContentType: true,
            responseType: 'blob',
        });

        if (!blob) return null;

        return URL.createObjectURL(blob);
    } catch (e) {
        console.error(e);
        return null;
    }
}
