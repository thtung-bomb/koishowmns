import dayjs from "dayjs";

export const timeIsoToLocale = (iso: string, locale = 'vi-VN') => {
    return new Date(iso).toLocaleString(locale);
};

export const getFormattedDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


export const formartedDate = (date: Date) => {
    return dayjs(date).format('DD-MM-YYYY hh:mm')
}