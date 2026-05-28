export const buildFormatDate = (date: number | string | null) => {
    if (!date) return '';

    return new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
};
