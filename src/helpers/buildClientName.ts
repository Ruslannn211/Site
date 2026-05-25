import type {UserType} from "@types-lib";
type PersonInput = Pick<UserType,
    "last_name"
    | "first_name"
    | "patronymic"
>

export function buildClientName(data: PersonInput): string {
    const parts: string[] = [];

    // обязательные
    if (data.last_name?.trim()) {
        parts.push(data.last_name.trim());
    }

    if (data.first_name?.trim()) {
        parts.push(data.first_name.trim());
    }

    // опциональные
    if (data.patronymic?.trim()) {
        parts.push(data.patronymic.trim());
    }

    return parts.join(" ");
}
