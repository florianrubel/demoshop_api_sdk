import { describe, it, expect } from 'vitest';
import { getCleanedQueryString } from '~/helpers/misc';

describe('getCleanedQueryString', () => {
    it('should return an empty string if no params are provided', () => {
        expect(getCleanedQueryString()).toBe('');
        expect(getCleanedQueryString(null)).toBe('');
        expect(getCleanedQueryString(undefined)).toBe('');
    });

    it('should handle an empty object', () => {
        expect(getCleanedQueryString({})).toBe('');
    });

    it('should handle simple key-value pairs', () => {
        expect(getCleanedQueryString({ key: 'value' })).toBe('key=value');
        expect(getCleanedQueryString({ a: 1, b: 2 })).toBe('a=1&b=2');
    });

    it('should ignore `null` and `undefined` values', () => {
        expect(getCleanedQueryString({ a: null, b: undefined, c: 'value' })).toBe('c=value');
    });

    it('should serialize nested objects', () => {
        expect(getCleanedQueryString({ obj: { a: 1, b: 2 } })).toBe('obj=%7B%22a%22%3A1%2C%22b%22%3A2%7D');
    });

    it('should serialize arrays', () => {
        expect(getCleanedQueryString({ arr: [1, 2, 3] })).toBe('arr=%5B1%2C2%2C3%5D');
    });

    it('should handle boolean values', () => {
        expect(getCleanedQueryString({ flag: true, enabled: false })).toBe('flag=true&enabled=false');
    });

    it('should handle a mix of data types', () => {
        const params = {
            a: 'string',
            b: 123,
            c: true,
            d: { nested: 'object' },
            e: [1, 2, 3],
            f: null,
            g: undefined,
        };
        const result = getCleanedQueryString(params);
        expect(result).toBe(
            'a=string&b=123&c=true&d=%7B%22nested%22%3A%22object%22%7D&e=%5B1%2C2%2C3%5D',
        );
    });

    it('should handle special characters in keys and values', () => {
        const params = { 'key with spaces': 'value with & and =' };
        const result = getCleanedQueryString(params);
        expect(result).toBe('key+with+spaces=value+with+%26+and+%3D');
    });

    it('should ignore empty objects and arrays', () => {
        const params = { emptyObj: {}, emptyArr: [], validKey: 'value' };
        const result = getCleanedQueryString(params);
        expect(result).toBe('validKey=value');
    });
});
