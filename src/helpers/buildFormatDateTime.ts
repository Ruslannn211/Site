export const buildFormatDateTime = (date: number | string | null, second: boolean = false) => {
    if (!date) return '';

    return new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...(second ? {second: '2-digit'} : {})
    }).format(new Date(date));
};
