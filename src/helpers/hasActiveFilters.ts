export const hasActiveFilters = (filters: any) => {
    return Object.values(filters).some(value => {

        if (value === null || value === undefined) {
            return false;
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        if (typeof value === "string") {
            return value.trim().length > 0;
        }

        return true;
    });
}