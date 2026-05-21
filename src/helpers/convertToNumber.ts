export function convertToNumber(value: string, prevNum?: number | null) {
    const isNumber = value.trim() !== "" && !Number.isNaN(Number(value));
    if (value.trim() === "") return null;
    if (!isNumber && prevNum) return prevNum;
    if (!isNumber) return null;
    return Number(value);
}