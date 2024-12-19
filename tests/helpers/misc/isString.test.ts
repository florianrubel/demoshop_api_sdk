import { describe, it, expect } from 'vitest';
import { isString } from '~api/helpers/misc';

describe('isString', () => {
    it('should return true for string primitives', () => {
        expect(isString('')).toBe(true);
        expect(isString('hello')).toBe(true);
        expect(isString('123')).toBe(true);
    });

    it('should return true for String objects', () => {
        expect(isString(new String('hello'))).toBe(true);
        expect(isString(new String(''))).toBe(true);
    });

    it('should return false for numbers', () => {
        expect(isString(123)).toBe(false);
        expect(isString(0)).toBe(false);
        expect(isString(-42)).toBe(false);
    });

    it('should return false for booleans', () => {
        expect(isString(true)).toBe(false);
        expect(isString(false)).toBe(false);
    });

    it('should return false for null and undefined', () => {
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
    });

    it('should return false for objects and arrays', () => {
        expect(isString([])).toBe(false);
        expect(isString(['hello'])).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString({ key: 'value' })).toBe(false);
    });

    it('should return false for functions', () => {
        expect(isString(() => {})).toBe(false);
        expect(isString(function test() {})).toBe(false);
    });

    it('should return false for instances of non-string objects', () => {
        expect(isString(new Date())).toBe(false);
        expect(isString(new Number(123))).toBe(false);
        expect(isString(new Boolean(true))).toBe(false);
    });
});
