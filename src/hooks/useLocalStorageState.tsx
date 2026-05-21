import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
    key: string,
    defaultValue: T
) {
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const setStorageValue = (
        valueOrUpdater: T | ((prev: T) => T)
    ) => {
        setValue(prev => {
            const newValue =
                typeof valueOrUpdater === "function"
                    ? (
                        valueOrUpdater as (
                            prev: T
                        ) => T
                    )(prev)
                    : valueOrUpdater;

            const stringified =
                JSON.stringify(newValue);

            localStorage.setItem(
                key,
                stringified
            );

            // кастомное событие
            window.dispatchEvent(
                new CustomEvent("local-storage", {
                    detail: {
                        key,
                        value: stringified,
                    },
                })
            );

            return newValue;
        });
    };

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key !== key) return;

            try {
                setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue);
            } catch { /* empty */ }
        };

        const handleCustom = (e: any) => {
            if (e.detail.key !== key) return;

            try {
                setValue(JSON.parse(e.detail.value));
            } catch { /* empty */ }
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("local-storage", handleCustom);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("local-storage", handleCustom);
        };
    }, [key]);

    return [value, setStorageValue] as const;
}