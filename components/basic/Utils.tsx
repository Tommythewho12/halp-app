

export function sanitizeNumberInput(num: string): string {
    let newNumber: string = num.replace(`/[^0-9]/g`, '');
    return isNumber(newNumber) ? newNumber : '0';
}

export function safeBooleanConverter(bool: any): boolean {
    if (typeof bool === 'boolean') {
        return bool;
    } else if (typeof bool === 'number') {
        return bool === 1 ? true : false;
    } else if (typeof bool === 'string') {
        return (bool.trim() === '' || bool === '0') ? false : true;
    } else {
        throw new Error("unable to safely parse the value " + bool + " to a boolean");
    }
}

export function safeNumberConverter(num: any): number {
    if (typeof num === 'number') {
        return num;
    } else if (typeof num === 'string' && isNumber(num)) {
        return Number(num);
    } else {
        throw new Error("unable to safely parse the value " + num + " to a number");
    }
}

export function isNumber(num: any): boolean {
    return !isNaN(Number(num));
}

export function is2XXStatus(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
}