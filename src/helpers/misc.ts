import { v4 as uuidv4 } from 'uuid';

export function getUniqueId(): string {
    return `_${uuidv4()}`;
}

export function isObject(value: unknown): value is object {
    return Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean' || value instanceof Boolean;
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && isFinite(value);
}

export function isString(value: unknown): value is string {
    return typeof value === 'string' || value instanceof String;
}

export function getCleanedQueryString(params?: unknown): string {
    const cleaned: Record<string, string> = {};

    if (!isObject(params)) return '';

    Object.keys(params as Record<string, unknown>).forEach((key) => {
        const value = (params as Record<string, unknown>)[key];
        if (([undefined, null] as (unknown | undefined | null)[]).includes(value)) {
            return;
        } else if (isObject(value)) {
            if (Object.keys(value).length <= 0) return;
            cleaned[key] = JSON.stringify(value);
        } else if (isArray(value)) {
            if (value.length <= 0) return;
            cleaned[key] = JSON.stringify(value);
        } else if (isBoolean(value)) {
            cleaned[key] = `${value}`;
        } else if (isNumber(value)) {
            cleaned[key] = value.toString();
        } else {
            cleaned[key] = `${value}`;
        }
    });

    return new URLSearchParams(cleaned).toString();
}
