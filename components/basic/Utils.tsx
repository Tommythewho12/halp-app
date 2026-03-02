

export function sanitizeNumberInput({ num }: { num: string }) {
    return num.replace(`/[^0-9]/g`, "");
}