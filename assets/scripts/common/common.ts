export const convertNumbersToPersian = (e: string | number | undefined): string | undefined | number => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    if(typeof(e) != 'undefined' ){
        const numberString = e.toLocaleString();
        return numberString.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
    } else {
        return e;
    }
}

export const convertNumbersToEnglish = (e: string | number): string => {
    e = e.toString();
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return e.replace(/[۰-۹]/g, (persianDigit) => englishDigits[persianDigit.charCodeAt(0) - 1776]);
}

export const toNumber = (value: string | number): number => {
    return Number(convertNumbersToEnglish(String(value ?? 0))) || 0;
}

export const convertDateToPersian = (d: Date | string | number , justDate : boolean = false) => {
    const persianDate = justDate ? new Date(d).toLocaleDateString('fa-IR') : new Date(d).toLocaleString('fa-IR');
    return persianDate;
}

export const convertDateToEnglish = (d: Date | string | number , justDate : boolean = false) => {
    const englishDate = justDate ? new Date(d).toLocaleDateString('en-US') : new Date(d).toLocaleString('en-US');
    return englishDate;
}