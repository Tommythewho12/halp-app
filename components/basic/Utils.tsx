

export function sanitizeNumberInput({ num }: { num: string }) {
    return num.replace(`/[^0-9]/g`, "");
}

export function safeBooleanConverter(bool: any): boolean {
    console.info("bool is: ", typeof bool, bool, typeof typeof bool);
    if (typeof bool === 'boolean') {
        return bool;
    } else if (typeof bool === 'number') {
        return bool === 1 ? true : false;
    } else if (typeof bool === 'string') {
        return (bool.trim() === '' || bool === '0') ? false : true;
    } else {
        throw "unable to safely parse the value to a boolean";
    }
}

export function isNumber(num: any): boolean {
    return !isNaN(Number(num));
}