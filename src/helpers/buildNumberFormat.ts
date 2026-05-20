interface BuildNumberFormatOptions {
    fractionDigits?: number;
}

export const buildNumberFormat = (
    number: number | string,
    options?: BuildNumberFormatOptions
) => {
    const value = Number(number);

    return value.toLocaleString("uk-UA", {
        minimumFractionDigits: options?.fractionDigits ?? 0,
        maximumFractionDigits: options?.fractionDigits ?? 0,
    });
};